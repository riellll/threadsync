"use client";
import Image from "next/image";
import profile from "../../../public/assets/user.svg";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { updateUser } from "@/lib/actions/user.action";

const AccountProfile = ({ user, btnTitle }) => {
  const [userImage, setUserImage] = useState([]);
  const [warning, setWarning] = useState("");

  const pathname = usePathname();
  const router = useRouter();

  const fileImage = async (e) => {
    // console.log(e.target.files[0]);
    if (!e.target.files[0]) {
      setUserImage([]);
      return;
    }
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      // console.log(reader.result);
      setUserImage([reader.result]);
    };
    reader.onerror = (error) => {
      alert("error image", error);
    };
  };

  const handleSubmit = async (formData) => {
    if (
      !formData.get("name") ||
      !formData.get("username") ||
      !formData.get("bio")
    ) {
    setWarning('Please complete all profile info')
    setTimeout(() => setWarning(''), 5000);
      return;
    }

/*     console.log(formData.get("name"),
    formData.get("username"),
    formData.get("bio")); */
    formData.append("file", userImage[0]);
    formData.append("upload_preset", "threadsync-image-upload_preset");
    formData.append("aoi_key", process.env.CLOUDINARY_API_KEY);

    const results = await fetch(
      "https://api.cloudinary.com/v1_1/dwiiuizwi/image/upload",
      {
        method: "POST",
        body: formData,
      }
    ).then((r) => r.json());

    const userId = user.id;
    const name = formData.get("name")
    const path = pathname;
    const username = formData.get("username")
    const bio = formData.get("bio")
    const image = results.url || user.image;

    await updateUser({ userId, name, path, username, image, bio });

    if (pathname === "/profile/edit") {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <>
      <form
        action={handleSubmit}
        className="flex flex-col justify-start text-slate-300"
      >
        <div className="flex items-center gap-4 mb-6">
          <label
            htmlFor="logo"
            className="flex flex-col h-24 w-24 items-center justify-self-center rounded-full bg-dark-9"
          >
            <h2 className="pl-48 block text-md font-medium text-gray-500 dark:text-gray-400">
              Profile
            </h2>
            <Image
              className="rounded-full h-20 w-24"
              src={userImage[0] || user?.image}
              alt="profile pic"
              width={100}
              height={100}
              priority
            />
          </label>
          <input
            accept="image/*"
            type="file"
            className="rounded p-2 w-full bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600"
            name="logo"
            onChange={fileImage}
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="name"
            className="block mb-2 text-md font-medium text-gray-500 dark:text-gray-400"
          >
            Name
          </label>
          <input
            type="text"
            className=" rounded p-2 w-full bg-gray-50 border text-gray-900 border-gray-300 dark:bg-gray-700 dark:border-gray-600"
            name="name"
            defaultValue={user.name}
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="username"
            className="block mb-2 text-md font-medium text-gray-500 dark:text-gray-400"
          >
            Username
          </label>
          <input
            type="text"
            className=" rounded p-2 w-full bg-gray-50 border text-gray-900 border-gray-300 dark:bg-gray-700 dark:border-gray-600"
            name="username"
            defaultValue={user.username}
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="bio"
            className="iblock mb-2 text-md font-medium text-gray-500 dark:text-gray-400"
          >
            Bio
          </label>
          <textarea
            className="rounded p-2 w-full bg-gray-50 border text-gray-900 border-gray-300 dark:bg-gray-700 dark:border-gray-600"
            name="bio"
            rows="10"
            defaultValue={user.bio}
          ></textarea>
        </div>

        <button
          type="submit"
          className="text-white bg-purple-900 hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 mr-2 mb-2 justify-center"
        >
          {btnTitle}
        </button>
        {warning && (
            <div
              className="text-sm text-center pt-4 text-yellow-800 rounded-lg dark:bg-gray-800 dark:text-yellow-400"
              role="alert"
            >
              <span className="font-medium">Warning! </span>
              {warning}
            </div>
          )}
      </form>
    </>
  );
};

export default AccountProfile;
