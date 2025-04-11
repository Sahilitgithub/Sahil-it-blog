"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { PostTypes } from "../post/AllPost";

const PostForm = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<PostTypes>({
    defaultValues: {
      title: "",
      slug: "",
      description: "",
      keywords: [],
      category: "",
      latestPost: false,
      featuredPost: false,
    },
  });

  const formSubmit: SubmitHandler<PostTypes> = () => {};
  return (
    <section>
      <h1 className="text-[15px] sm:text-[17px] bg-slate-950 p-2 rounded-md">
        Create new post
      </h1>
      <form
        onSubmit={handleSubmit(formSubmit)}
        className="w-full p-4 bg-slate-950 rounded-md"
      >
        <div className="my-3 grid grid-cols-1 sm:grid-cols-2 items-center gap-2 text-[13px] sm:text-[15px]">
          <div>
            <input
              type="text"
              placeholder="Title"
              {...register("title", {
                required: "Title is required",
              })}
              className="w-full h-full p-3 rounded-md bg-slate-800"
            />
            {errors.title?.message && (
              <span className="text-[12px] sm:text-[13px] text-red-800">
                {errors.title.message}
              </span>
            )}
          </div>
          <div>
            <input
              type="text"
              placeholder="Slug/Url"
              {...register("slug", {
                required: "Slug is required",
              })}
              className="w-full h-full p-3 rounded-md bg-slate-800"
            />
            {errors.slug?.message && (
              <span className="text-[12px] sm:text-[13px] text-red-800">
                {errors.slug.message}
              </span>
            )}
          </div>
        </div>
        <div className="my-3 grid grid-cols-1 sm:grid-cols-2 items-center gap-2 text-[13px] sm:text-[15px]">
          <div>
            <input
              type="text"
              placeholder="Latest Post"
              {...register("latestPost", {
                required: "Latest Post is required",
              })}
              className="w-full h-full p-3 rounded-md bg-slate-800"
            />
            {errors.latestPost?.message && (
              <span className="text-[12px] sm:text-[13px] text-red-800">
                {errors.latestPost.message}
              </span>
            )}
          </div>
          <div>
            <input
              type="text"
              placeholder="Featured Post"
              {...register("featuredPost", {
                required: "Featured Post is required",
              })}
              className="w-full h-full p-3 rounded-md bg-slate-800"
            />
            {errors.featuredPost?.message && (
              <span className="text-[12px] sm:text-[13px] text-red-800">
                {errors.featuredPost.message}
              </span>
            )}
          </div>
        </div>
        <div className="my-3 grid grid-cols-1 sm:grid-cols-2 items-center gap-2 text-[13px] sm:text-[15px]">
          <div>
            <input
              type="text"
              placeholder="Keyword"
              {...register("keywords", {
                required: "Keywords are required",
              })}
              className="w-full h-full p-3 rounded-md bg-slate-800"
            />
            {errors.keywords?.message && (
              <span className="text-[12px] sm:text-[13px] text-red-800">
                {errors.keywords.message}
              </span>
            )}
          </div>

          <div>
            <input
              type="text"
              placeholder="Category"
              {...register("category", {
                required: "Category is required",
              })}
              className="w-full h-full p-3 rounded-md bg-slate-800"
            />
            {errors.category?.message && (
              <span className="text-[12px] sm:text-[13px] text-red-800">
                {errors.category.message}
              </span>
            )}
          </div>
        </div>
        <div className="mt-3 text-[13px] sm:text-[15px]">
          <textarea
            placeholder="Description"
            {...register("description", {
              required: "Description is required",
            })}
            className="w-full h-60 p-3 rounded-md bg-slate-800"
          />
          {errors.description?.message && (
            <span className="text-[12px] sm:text-[13px] text-red-800">
              {errors.description.message}
            </span>
          )}
        </div>
        <div className="mt-2 text-[13px] sm:text-[15px]">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 text-black text-[15px] sm:text-[16px] w-24 p-2 rounded-md"
          >
            {isSubmitting ? "Creating..." : "Create"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default PostForm;
