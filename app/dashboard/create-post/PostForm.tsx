import React from "react";

const PostForm = () => {
  return (
    <div>
      <h1 className="text-[15px] sm:text-[17px] bg-slate-950 p-2 rounded-md">
        Create Post
      </h1>
      <div className="bg-slate-950 rounded-md p-2 text-white">
        <form>
          <div className="grid gap-3 grid-cols-1 sm:grid-cols-2">
            {/* Title And Slug/Url Part */}
            <div>
              <label
                htmlFor="title"
                area-label="title"
                className="text-[15px] sm:text[17px]"
              >
                Title
              </label>
              <input
                type="text"
                placeholder="Post Title"
                className="w-full border bg-slate-900 border-slate-300 rounded-md p-2 focus:outline-none focus:border-slate-500"
              />
            </div>
            <div>
              <label
                htmlFor="slug"
                area-label="Slug"
                className="text-[15px] sm:text[17px]"
              >
                Slug/Url
              </label>
              <input
                type="text"
                placeholder="Post Slug"
                className="w-full border bg-slate-900 border-slate-300 rounded-md p-2 focus:outline-none focus:border-slate-500"
              />
            </div>
          </div>
          {/* Featured And Latest Post Part */}
          <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 my-2">
              <div className="">
                <label
                  htmlFor="slug"
                  area-label="Slug"
                  className="text-[15px] sm:text[17px]"
                >
                  Featured/Latest Post
                </label>
                <select className="w-full border bg-slate-900 border-slate-300 rounded-md p-[10.5px] focus:outline-none focus:border-slate-500">
                  <option value="default">Default</option>
                  <option value="Latest Post">Latest Post</option>
                  <option value="Featured Post">Featured Post</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="slug"
                  area-label="Slug"
                  className="text-[15px] sm:text[17px]"
                >
                  Slug/Url
                </label>
                <input
                  type="text"
                  placeholder="Post Slug"
                  className="w-full border bg-slate-900 border-slate-300 rounded-md p-2 focus:outline-none focus:border-slate-500"
                />
              </div>
            </div>
          {/* keywords And Tags Part */}
          <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 my-2">
            <div>
              <label
                htmlFor="keywords"
                area-label="keywords"
                className="text-[15px] sm:text[17px]"
              >
                Keywords
              </label>
              <input
                type="text"
                placeholder="Post Keywords"
                className="w-full border bg-slate-900 border-slate-300 rounded-md p-2 focus:outline-none focus:border-slate-500"
              />
            </div>
            <div className="my-3">
              <label
                htmlFor="post Primary Image"
                area-label="post Primary Image"
                className="text-[15px] sm:text[17px]"
              >
                Primary Image
              </label>
              <input
                type="file"
                placeholder="Post Primary Image"
                className="w-full border bg-slate-900 border-slate-300 rounded-md p-2 focus:outline-none focus:border-slate-500"
              />
            </div>
            </div>
          {/* Description Part */}
          <div>
            <label
              htmlFor="description"
              area-label="description"
              className="text-[15px] sm:text[17px]"
            >
              Description
            </label>
            <textarea
              placeholder="Post Description"
              className="w-full border bg-slate-900 border-slate-300 rounded-md p-2 focus:outline-none focus:border-slate-500"
            ></textarea>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostForm;
