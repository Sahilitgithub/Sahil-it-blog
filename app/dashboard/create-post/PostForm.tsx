"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

// Type of posts
export interface InputProps {
  title: string;
  slug: string;
  description: string;
  category?: string;
  featured?: string;
  keywords?: string[];
  image?: string;
}

const PostForm = () => {
  const [inputKeyword, setInputKeyword] = useState("");
  const [keywordError, setKeywordError] = useState("");
  const [keywordState, setKeywordState] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // React hook form for vaidation and get input data
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<InputProps>();

  // Create post function
  const onSubmit: SubmitHandler<InputProps> = async (form) => {
    if (keywordState.length === 0) {
      setKeywordError("At least one keyword is required");
      return;
    }

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          keywords: keywordState,
          image: imageUrl,
        }),
      });

      if (!response.ok) {
        const err = await response.json();
        alert(err.message || "Error submitting post");
        return;
      }
      const data = await response.json();
      if (data?.id) {
        router.push(`/dashboard/posts/${data.slug}`);
      } else {
        console.error("No ID returned:", data);
      }

    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log("Unexpected error occurred", error);
      }
    }
  };

  return (
    <div className="bg-slate-950 rounded-md p-5">
      <h1 className="text-xl font-bold mb-4">Create Post</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Title Part */}
        <input
          {...register("title", { required: true })}
          placeholder="Title"
          className="bg-slate-900 rounded-md p-2 text-[13px] lg:text-[16px] w-full shadow-sm shadow-slate-700"
        />
        {errors.title && (
          <span className="text-[13px] lg:text-[14px] text-red-600">
            Title is required
          </span>
        )}

        {/* Slug Part */}
        <input
          {...register("slug", {
            required: "Slug is required",
          })}
          placeholder="Slug"
          className="bg-slate-900 rounded-md p-2 w-full shadow-sm shadow-slate-700"
        />
        {errors.slug && (
          <span className="text-[13px] lg:text-[14px] text-red-600">
            {errors.slug.message}
          </span>
        )}

        {/* Category Part */}
        <input
          {...register("category", { required: true })}
          placeholder="Category"
          className="bg-slate-900 rounded-md p-2 w-full shadow-sm shadow-slate-700"
        />
        {errors.category && (
          <span className="text-[13px] lg:text-[14px] text-red-600">
            Category is required
          </span>
        )}

        {/* Latest and Featured Post Part */}
        <select
          {...register("featured")}
          className="bg-slate-900 rounded-md p-2 w-full shadow-sm shadow-slate-700"
        >
          <option value="Latest Post">Latest Post</option>
          <option value="Featured Post">Featured Post</option>
        </select>

        {/* Description Part */}
        <textarea
          {...register("description", { required: true })}
          rows={10}
          placeholder="Description"
          className="bg-slate-900 rounded-md p-2 w-full shadow-sm shadow-slate-700"
        />
        {errors.description && (
          <span className="text-[13px] lg:text-[14px] text-red-600">
            Description is required
          </span>
        )}

        {/* Keyword Tags part */}
        <div>
          <div className="flex gap-2">
            <input
              type="text"
              value={inputKeyword}
              onChange={(e) => setInputKeyword(e.target.value)}
              placeholder="Keyword"
              className="bg-slate-900 rounded-md p-2 w-full shadow-sm shadow-slate-700"
            />
            <button
              type="button"
              onClick={() => {
                if (inputKeyword.trim()) {
                  setKeywordState([...keywordState, inputKeyword.trim()]);
                  setInputKeyword("");
                  setKeywordError("");
                }
              }}
              className="bg-blue-800 px-4 rounded-md"
            >
              Add
            </button>
          </div>
          {/* Keyword error handler */}
          {keywordError && (
            <p className="text-[13px] lg:text-[14px] text-red-600">
              {keywordError}
            </p>
          )}
          {/*Map Keyword data */}
          <div className="flex gap-1 flex-wrap mt-1">
            {keywordState.map((word, i) => (
              <span
                key={i}
                className="bg-gray-800 text-white px-2 py-1 rounded"
                onClick={() =>
                  setKeywordState(
                    keywordState.filter((_, index) => index !== i)
                  )
                }
              >
                {word}{" "}
                <span className="ml-1 text-red-500 cursor-pointer">x</span>
              </span>
            ))}
          </div>
        </div>

        {/* Image upload */}
        <div className="flex gap-x-4">
          <div>
            <input
              type="file"
              disabled={isUploading}
              ref={(el) => {
                fileInputRef.current = el; // ✅ safe and correct
              }}
              // Post file on pinata
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

            {/* Upload Image to pinata handler button */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="bg-blue-800 p-2 rounded-md my-1"
            >
              {isUploading ? "Uploading..." : "Upload Image"}
            </button>
          </div>

          {/* Show image from pinata */}
          <div className="w-20 h-20 bg-slate-800 rounded-md">
            {imageUrl && (
              <figure className="w-20 h-20">
                <Image
                  src={imageUrl}
                  width={100}
                  height={100}
                  alt="Preview"
                  className="rounded-md w-full h-full"
                  loading="lazy"
                />
              </figure>
            )}
          </div>
        </div>
        {/* Submiting Post On Backend */}
        <button
          type="submit"
          className="bg-green-700 px-4 rounded-md py-2"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default PostForm;
