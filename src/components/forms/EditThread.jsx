"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { updateThread } from "@/lib/actions/thread.action";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import Spinner from "../shared/Spinner";

const EditThread = ({ thread }) => {
  const [userImage, setUserImage] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);

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

    const threadId = thread._id;
    const text = formData.get("message");
    const img = results.url || thread.img;
    const path = pathname;

    await updateThread({ text, img, threadId, path });

    setTimeout(() => {
      setIsLoading(false);
      router.back();
    }, 5000);
  };

  // console.log(thread._id)
  return (
    <form
      action={handleSubmit}
      className="mt-3 flex flex-col justify-start gap-10"
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
          defaultValue={thread.text}
        ></textarea>

        {/* {thread.img && ( 
            <> */}
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
        {userImage[0] || thread.img ? (
          <Image
            src={userImage[0] || thread.img}
            alt="heart"
            width={500}
            height={500}
            className="w-96 h-auto"
          />
        ) : undefined}
        {/* </>)} */}
      </div>
      <button
        type="submit"
        disabled={isLoading && true}
        className={`text-white bg-gradient-to-r ${
          isLoading
            ? "from-gray-900 via-gray-800 to-gray-900"
            : "from-cyan-500 via-cyan-600 to-cyan-700 hover:bg-cyan-900 hover:from-cyan-900 hover:via-cyan-800 hover:to-cyan-900"
        } font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#050708]/30 mr-2 mb-2 justify-center`}
      >
        {isLoading ? <Spinner/> : 'Edit Thread'}
      </button>
    </form>
  );
};

export default EditThread;
