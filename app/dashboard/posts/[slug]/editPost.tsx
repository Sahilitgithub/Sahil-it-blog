"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

// Type of form data
type FormData = {
  title: string;
  slug: string;
  description: string;
  category: string;
  featured: string;
  keywords: string;
  image?: string;
};

// Edit post data type
interface EditPostProps {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  slug: string;
  image?: string | null;
  description: string;
  category?: string | null;
  featured?: string | null;
  keywords?: string | null;
  userId: string;
}

interface EditPostComponentProps {
  passPost: EditPostProps;
}

const EditPost = ({ passPost }: EditPostComponentProps) => {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  // Get single post data
  const post = passPost;

  // React hook form hook to default value to update
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: passPost.title,
      slug: passPost.slug,
      description: passPost.description,
      category: passPost.category || "",
      featured: passPost.featured || "",
      keywords: passPost.keywords || "",
      image: passPost?.image || imageUrl,
    },
  });

  // Submit Handler Function
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const response = await fetch(`/api/posts/${post.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    toast.success("Post Updated Successfully");
  };

  return (
    <section>
      {/* Header of update post */}
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
      {/* Form Input Data */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-slate-950 p-4 rounded-md"
      >
        {/* Tilte And Slug Part */}
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
              {...register("title", {
                required: "Title is required",
                maxLength: {
                  value: 160,
                  message: "Title cannot exceed 160 characters",
                },
              })}
              className="w-full bg-slate-800 p-3 rounded-md"
            />
            {errors.title?.message && (
              <span className="text-red-700 text-sm">
                {errors.title.message}
              </span>
            )}
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
              {...register("slug", {
                required: "Slug is required",
                maxLength: {
                  value: 160,
                  message: "Slug cannot exceed 160 characters",
                },
              })}
              type="text"
              className="w-full bg-slate-800 p-3 rounded-md"
            />
            {errors.slug?.message && (
              <span className="text-red-700 text-sm">
                {errors.slug.message}
              </span>
            )}
          </div>
        </div>
        {/* Category And Latest/Featured Part */}
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
              {...register("category", {
                required: "Category is required",
              })}
              type="text"
              className="w-full bg-slate-800 p-3 rounded-md"
            />
            {errors.category?.message && (
              <span className="text-red-700 text-sm">
                {errors.category.message}
              </span>
            )}
          </div>
          <div className="flex gap-2">
            <div className="">
              <label
                htmlFor="Featured"
                area-label="Featured"
                className="text-[15px] sm:text[17px]"
              >
                Featured/Latest Post
              </label>
              <select
                {...register("featured", { required: false })}
                className="w-full border bg-slate-900 border-slate-300 rounded-md p-[10.5px] focus:outline-none focus:border-slate-500"
              >
                <option value="Latest Post">Latest Post</option>
                <option value="Featured Post">Featured Post</option>
              </select>
            </div>
          </div>
        </div>
        {/* Keywords Part */}
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
              {...register("keywords", {
                required: "Keywords are required",
                maxLength: {
                  value: 500,
                  message: "Keywords cannot exceed 500 characters",
                },
              })}
              className="w-full bg-slate-800 p-3 rounded-md"
            />
          </div>
        </div>
        {/* Description Part*/}
        <div className="grid grid-cols-1 mt-2">
          <label
            htmlFor="description"
            aria-label="description"
            className="text-[13px] sm:text[15px]"
          >
            Description
          </label>
          <textarea
            {...register("description", {
              required: "Description is required",
              maxLength: {
                value: 5000,
                message: "Description cannot exceed 5000 characters",
              },
            })}
            className="w-full bg-slate-800 p-3 rounded-md h-32 sm:h-40"
          />
        </div>
        {/* Image upload Part */}
        <div className="flex gap-x-4 my-4">
          <div className="flex gap-4">
            <div>
              <input
                type="file"
                disabled={isUploading}
                ref={(el) => {
                  fileInputRef.current = el; // ✅ safe and correct
                }}
                // Update image from pinata
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  setIsUploading(true);

                  const data = new FormData();
                  data.set("file", file);

                  const res = await fetch("/api/file-upload", {
                    method: "POST",
                    body: data,
                  });

                  const result = await res.json();
                  setImageUrl(result);
                  setIsUploading(false);
                }}
                className="bg-slate-900 rounded-md p-2 w-full shadow-sm shadow-slate-700"
              />

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="bg-blue-800 p-2 rounded-md my-1"
              >
                {isUploading ? "Uploading..." : "Upload Image"}
              </button>
            </div>
            <div className="w-20 h-20 bg-slate-800 rounded-md">
              {(imageUrl || post.image) && (
                <figure className="w-20 h-20 bg-slate-800 rounded-md">
                  <Image
                    src={imageUrl || post.image || "images/slide-1.png"} // fallback if needed
                    width={100}
                    height={100}
                    alt="Preview"
                    className="rounded-md w-full h-full object-cover"
                    loading="lazy"
                  />
                </figure>
              )}
            </div>
          </div>
        </div>
        {/* Submit Button Here */}
        <div className="mt-1">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-stone-700 w-24 p-2 rounded-md"
          >
            {isSubmitting ? "Updating..." : "Update"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default EditPost;
