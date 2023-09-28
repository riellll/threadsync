"use client";

const CreatePost = () => {
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
        className="mt-10 flex flex-col justify-start gap-10"
      >
        <div>
          <label
            htmlFor="text"
            className="block mb-2 text-sm font-medium text-gray-500 dark:text-gray-400"
          >
            Title
          </label>
          <input
            type="text"
            id="text"
            aria-describedby="helper-text-explanation"
            className="bg-gray-50 border mb-3 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Title..."
          />

          <label
            className="block mb-2 text-sm font-medium text-gray-500 dark:text-gray-400"
            htmlFor="user_avatar"
          >
            Upload Image (optional)
          </label>
          <input
            className="block w-full text-sm mb-3 text-gray-900 border border-gray-300 rounded-lg cursor-pointer p-2 bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            aria-describedby="user_avatar_help"
            id="user_avatar"
            type="file"
          />

          <label
            htmlFor="message"
            className="block mb-2 text-sm font-medium text-gray-500 dark:text-gray-400"
          >
            body text (optional)
          </label>
          <textarea
            id="message"
            rows="4"
            className="block no-focus p-2.5 w-full h-80 text-sm text-gray-100 bg-gray-50 rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            placeholder="Create body text..."
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="text-white bg-purple-900 hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 mr-2 mb-2 justify-center"
        >
          Post Thread
        </button>
      </form>
    </>
  );
};

export default CreatePost;
