"use client";
import { SubmitHandler, useForm } from "react-hook-form";

export interface InputProps {
  title: string;
  slug: string;
  description: string;
  category?: string;
  featured?: string;
  keywords?: string
}

const PostForm = () => {
  const {register, handleSubmit, formState: {errors, isSubmitting} } = useForm<InputProps>({
    defaultValues: {
      title: "",
      slug: "",
      description: "",
      category: "",
      featured: "latestPost", // Default to Latest Post
      keywords: ""
    }
  });

  const onSubmit:SubmitHandler<InputProps> = async (form) => {
    console.log("Form Data", form)
      try {
        const response = await fetch("/api/posts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            title: form.title,
            slug: form.slug,
            description: form.description,
            category: form.category,
            featured: form.featured,
            keywords: form.keywords
          })
        })
        await response.json();

        if(!response.ok) {
           const errorData = await response.json();
           alert(`Error: ${errorData.message}`);
           return;
        }
        alert("Post created successfully!");
      } catch (error: unknown) {
        throw new Error("An error occurred while submitting the form", { cause: error });
      }
  }

  return (
    <div>
      <h1 className="text-[15px] sm:text-[17px] bg-slate-950 p-2 rounded-md">
        Create Post
      </h1>
      <div className="bg-slate-950 rounded-md p-2 text-white">
        <form onSubmit={handleSubmit(onSubmit)}>
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
                placeholder="Title"
                {...register("title", {required: "Title is required", maxLength: 160})}
                className="w-full border bg-slate-900 border-slate-300 rounded-md p-2 focus:outline-none focus:border-slate-500"
              />
              {errors.title?.message && <span className="text-red-700 text-sm">{errors.title.message}</span>}
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
                placeholder="Slug"
                  {...register("slug", {
                    required: "Slug is required",
                    maxLength: 160,
                    validate: async (value) => {
                      const res = await fetch(`/api/posts/validate-slug?slug=${value}`);
                      const data = await res.json();
                      return !data.exists || "Slug already in use";
                    },
                  })}
                className="w-full border bg-slate-900 border-slate-300 rounded-md p-2 focus:outline-none focus:border-slate-500"
              />
              {errors.slug?.message && <span className="text-red-700 text-sm">{errors.slug.message}</span>}
            </div>
          </div>
          {/* Featured And Latest Post Part */}
          <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 my-2">
              <div className="">
                <label
                  htmlFor="Featured"
                  area-label="Featured"
                  className="text-[15px] sm:text[17px]"
                >
                  Featured/Latest Post
                </label>
                <select 
                  {...register("featured", {required: false})}
                  className="w-full border bg-slate-900 border-slate-300 rounded-md p-[10.5px] focus:outline-none focus:border-slate-500">
                  <option value="Latest Post">Latest Post</option>
                  <option value="Featured Post">Featured Post</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="category"
                  area-label="category"
                  className="text-[15px] sm:text[17px]"
                >
                  Category
                </label>
                <input
                  type="text"
                  placeholder="Category"
                  {...register("category", {required: "Category is required"})}
                  className="w-full border bg-slate-900 border-slate-300 rounded-md p-2 focus:outline-none focus:border-slate-500"
                />
              {errors.category?.message && <span className="text-red-700 text-sm">{errors.category.message}</span>}
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
                placeholder="Keywords"
                {...register("keywords", {required: "Keywords are required", maxLength: 500})}
                className="w-full border bg-slate-900 border-slate-300 rounded-md p-2 focus:outline-none focus:border-slate-500"
              />
              {errors.keywords?.message && <span className="text-red-700 text-sm">{errors.keywords.message}</span>}
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
              placeholder="Description"
              rows={5}
                {...register("description", {required: "Description is required", maxLength: 5000})}
              className="w-full border bg-slate-900 border-slate-300 rounded-md p-2 focus:outline-none focus:border-slate-500"
            ></textarea>
              {errors.description?.message && <span className="text-red-700 text-sm">{errors.description.message}</span>}
          </div>
          <div>
            <button type="submit" 
            disabled={isSubmitting}
            className="px-4 py-2 rounded-md bg-green-800" >
              {isSubmitting ? "Submit...": "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostForm;
