"use client";
import Image from "next/image";
import donbel from "../../../public/don-bel.webp";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { createThread } from "@/lib/actions/thread.action";

const CreatePost = ({ userId }) => {
  const [userImage, setUserImage] = useState([]);

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
    if (!formData.get("message")) {
      return;
    }

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

    const author = userId;
    const text = formData.get("message");
    const img = results.url || '';
    const path = pathname;

    await createThread({ text, img, author, path });
    router.push("/");
    // console.log(formData.get("message"));
  };
  return (
    <>
      <form
        action={handleSubmit}
        className="mt-10 flex flex-col justify-start gap-10"
      >
        <div>
          <label
            htmlFor="message"
            className="block mb-2 text-sm font-medium text-gray-500 dark:text-gray-400"
          >
            Text content
          </label>
          <textarea
            id="message"
            rows="4"
            name="message"
            className="block no-focus p-2.5 w-full h-60 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            placeholder="Create body text..."
          ></textarea>

          <label
            className="block mb-2 mt-5 text-sm font-medium text-gray-500 dark:text-gray-400"
            htmlFor="user_avatar"
          >
            Upload image
          </label>
          <input
            className="block w-full text-sm mb-3 text-gray-900 border border-gray-300 rounded-lg cursor-pointer p-2 bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            aria-describedby="user_avatar_help"
            id="user_avatar"
            type="file"
            onChange={fileImage}
          />
          {userImage[0] && (
            <Image
              src={userImage[0]}
              alt="heart"
              width={500}
              height={500}
              className="w-96 h-auto"
            />
          )}
        </div>
        <button
          type="submit"
          className="text-white bg-gradient-to-r from-cyan-500 via-cyan-600 to-cyan-700 hover:bg-gray-900 hover:from-gray-900 hover:via-gray-800 hover:to-gray-900 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 mr-2 mb-2 justify-center"
        >
          Post Thread
        </button>
      </form>
    </>
  );
};

export default CreatePost;
