"use client";
import { Post } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const PostsItem = ({ post }: { post: Post }) => {
  return (
    <article>
      <Link href={`/post/${post.slug}`}>
        <div className="bg-[#001021] box-shadow text-white rounded-md p-2">
          {/* Post image */}
          <figure className="bg-black">
            <div style={{ position: "relative", height: "230px" }}>
              <Image
                alt={post.title || "No Image Preview"}
                src={post.image || "/images/slide-1.png"}
                fill
                sizes="(min-width: 808px) 50vw, 100vw"
                style={{
                  objectFit: "cover",
                  borderRadius: "6px",
                }}
                loading="lazy"
              />
            </div>
          </figure>

          {/* Post date */}
          {post.createdAt && (
            <span className="text-sm bg-slate-600 rounded px-1">
              {new Date(post.createdAt).toLocaleDateString()}
            </span>
          )}

          {/* Post title */}
          <h2 className="text-amber-600 text-[17px] lg:text-[18px]">
            {post.title?.length > 25
              ? `${post.title.slice(0, 25)}...`
              : post.title}
          </h2>

          {/* Post description */}
          <p className="text-slate-400 text-sm text-start">
            {post.description?.length > 60
              ? `${post.description.slice(0, 60)}...`
              : post.description}
          </p>
        </div>
      </Link>
    </article>
  );
};

export default PostsItem;
