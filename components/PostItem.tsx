"use client"
import { Post } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

// Post item function
const PostsItem = ({ post }: { post: Post }) => {
  return (
    <article>
      <Link href={`/post/${post.slug}`} passHref>
        <div className="bg-[#001021] box-shadow text-white rounded-md p-2">
          {/* Post image Part */}
          <figure className="bg-black">
            <div style={{ position: "relative", height: "230px" }}>
              <Image
                alt={post.title || "Not Image Preview"}
                src={post.image ?? "/images/slide-1.png"}
                fill
                sizes="(min-width: 808px) 50vw, 100vw"
                style={{
                  objectFit: "cover", // cover, contain, none
                  borderRadius: '6px'
                }}
                loading="lazy"
              />
            </div>
          </figure>
          {/* Post Date Part */}
          <span className="text-sm bg-slate-600 rounded">20/12/2025</span>
          {/* Post Title Part */}
          <h2 className="text-amber-600 text-[17px] lg:text-[18px]">
            {post.title.slice(0, 25)}{"..."}
          </h2>
          {/* Post description Part */}
          <p className="text-slate-400 text-sm text-start">
            {post.description.slice(0, 60)}{"..."}
          </p>
        </div>
      </Link>
    </article>
  );
};

export default PostsItem;
