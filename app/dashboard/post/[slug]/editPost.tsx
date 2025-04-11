"use client";
import { useState } from "react";
import { postsData } from "../AllPost";
import { useRouter } from "next/navigation";

const EditPost = ({ paramsId }: { paramsId: string }) => {
  const router = useRouter();
  const post = postsData.find((item) => item.id === Number(paramsId));
  const [postTitle, setPostTitle] = useState(post?.title || "");
  const [ postSlug, setPostSlug] = useState(post?.slug || "");
  const [postDescription, setPostDescription] = useState(
    post?.description || ""
  );
  const [postCategory, setPostCategory] = useState(post?.category || "");
  const [postLatestPost, setPostLatestPost] = useState(
    post?.latestPost || false
  );
  const [postFeaturedPost, setPostFeaturedPost] = useState(
    post?.featuredPost || false
  );
  const [postKeywords, setPostKeywords] = useState(post?.keywords || "");

  if (!post) {
    return <div>No post found</div>;
  }

  const updatePost = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedPost = {
      ...post,
      title: postTitle,
      slug: postSlug,
      description: postDescription,
      category: postCategory,
      latestPost: postLatestPost,
      featuredPost: postFeaturedPost,
      keywords: Array.isArray(postKeywords) ? postKeywords : postKeywords.split(","),
    };
    // Here you would typically send the updated post to your server or API
    console.log("Updated codes: ", updatedPost);
  };

  return (
    <section>
      <div className="flex justify-between flex-wrap items-center">
        <button
          type="button"
          onClick={() => router.back()}
          className="bg-red-600 rounded-md p-1 text-white"
        >
          Back
        </button>
        <h2 className="text-[15px] sm:text-[17px] bg-slate-900 p-1 rounded-md">
          Post Id: {post.id}
        </h2>
        <h1 className="text-[15px] sm:text-[17px] bg-slate-900 p-1 rounded-md">
          Edit Post
        </h1>
      </div>
      <form onSubmit={updatePost} className="bg-slate-950 p-4 rounded-md">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-3">
          <div>
            <label
              htmlFor="title"
              aria-label="title"
              className="text-[13px] sm:text[15px]"
            >
              Title
            </label>
            <input
              type="text"
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
              className="w-full bg-slate-800 p-3 rounded-md"
            />
          </div>
          <div>
            <label
              htmlFor="slug"
              aria-label="slug"
              className="text-[13px] sm:text[15px]"
            >
              Slug/Url
            </label>
            <input
              type="text"
              value={postSlug}
              onChange={(e) => setPostSlug(e.target.value)}
              className="w-full bg-slate-800 p-3 rounded-md"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-3">
        <div>
            <label
              htmlFor="category"
              aria-label="category"
              className="text-[13px] sm:text[15px]"
            >
              Category
            </label>
            <input
              type="text"
              value={postCategory}
              onChange={(e) => setPostCategory(e.target.value)}
              className="w-full bg-slate-800 p-3 rounded-md"
            />
          </div>
          <div className="flex gap-2">
            <div className="">
              <label
                htmlFor="Latest Post"
                aria-label="latest-post"
                className="text-[13px] sm:text[15px]"
              >
                Leatest Post
              </label>
              <input
                type="checkbox"
                checked={postLatestPost}
                onChange={(e) => setPostLatestPost(e.target.checked)}
                className="w-full bg-slate-800 p-3 rounded-md"
              />
            </div>
            <div className="">
              <label
                htmlFor="featured-post"
                aria-label="Featured-post"
                className="text-[13px] sm:text[15px]"
              >
                Featured Post
              </label>
              <input
                type="checkbox"
                checked={postFeaturedPost}
                onChange={(e) => setPostFeaturedPost(e.target.checked)}
                className="w-full bg-slate-800 p-3 rounded-md"
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 my-3">
        <div>
            <label
              htmlFor="keywords"
              aria-label="Keywords"
              className="text-[13px] sm:text[15px]"
            >
              Keywords
            </label>
            <textarea
              value={postKeywords}
              onChange={(e) => setPostKeywords(e.target.value)}
              className="w-full bg-slate-800 p-3 rounded-md"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 mt-2">
          <label
            htmlFor="description"
            aria-label="description"
            className="text-[13px] sm:text[15px]"
          >
            Description
          </label>
          <textarea
            value={postDescription}
            onChange={(e) => setPostDescription(e.target.value)}
            className="w-full bg-slate-800 p-3 rounded-md h-32 sm:h-40"
          />
        </div>

        <div className="mt-1">
          <button
            type="submit"
            className="bg-stone-700 w-24 p-2 rounded-md"
          >
            Update
          </button>
        </div>
      </form>
    </section>
  );
};

export default EditPost;
