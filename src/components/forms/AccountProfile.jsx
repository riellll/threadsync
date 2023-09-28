'use client'
import Image from "next/image";
import profile from "../../../public/assets/user.svg";

const AccountProfile = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e.target[0].value);
    console.log(e.target[1].value);
    console.log(e.target[2].value);
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-start text-slate-300"
      >
        <div className="flex items-center gap-4 mb-6">
          <label
            htmlFor="logo"
            className="flex flex-col h-24 w-24 items-center justify-center rounded-full bg-dark-9"
          >
            {/*        {userImage[0] ? (
              <Image
                className="rounded-full h-20 w-24"
                src={userImage}
                alt="profile pic"
                width={100}
                height={100}
                priority
              />
            ) : (
              <Image
                className="rounded-full h-20 w-24"
                src={user?.image || profile}
                alt="profile pic"
                width={100}
                height={100}
                priority
              />
            )} */}
                <h2 className="pl-48 block mb-2 text-md font-medium text-gray-500 dark:text-gray-400">Profile</h2>
            <Image
                className="rounded-full h-20 w-24"
                src={profile}
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
            // onChange={fileImage}
          />
        </div>

        <div className="mb-6">
          <label htmlFor="Name" className="block mb-2 text-md font-medium text-gray-500 dark:text-gray-400">
            Name
          </label>
          <input
            type="text"
            className=" rounded p-2 w-full bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600"
            name="name"
            defaultValue={"user.name"}
          />
        </div>

        <div className="mb-6">
          <label htmlFor="Username" className="block mb-2 text-md font-medium text-gray-500 dark:text-gray-400">
            Username
          </label>
          <input
            type="text"
            className=" rounded p-2 w-full bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600"
            name="Username"
            defaultValue={"user.username"}
          />
        </div>

        <div className="mb-6">
          <label htmlFor="Bio" className="iblock mb-2 text-md font-medium text-gray-500 dark:text-gray-400">
            Bio
          </label>
          <textarea
            className="rounded p-2 w-full bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600"
            name="Bio"
            rows="10"
            defaultValue={"user.bio"}
          ></textarea>
        </div>

        <button
          type="submit"
          className="text-white bg-purple-900 hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 mr-2 mb-2 justify-center"
        >
          {"btnTitle"}
        </button>
      </form>
    </>
  );
};

export default AccountProfile;
