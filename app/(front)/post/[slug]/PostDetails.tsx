"use client";
import CommentCom from "@/components/Comment";
import { Post } from "@prisma/client";
import Image from "next/image";

const PostDetails = ({ post }: { post: Post }) => {
  
  return (
    <section className="text-white rounded-md px-6 md:px-44">
      <figure className="w-full h-[500px] bg-slate-900 rounded-md">
        <Image
          src={post.image || "/images/slide-1.png"}
          alt={post.title || "Not Image Preview"}
          className="w-full h-full rounded-md"
          width={1000}
          height={200}
          priority
        />
      </figure>
      <article>
        <span className="bg-blue-900 inline-block rounded-md p-1 px-3 mt-1">
          {post.createdAt.toLocaleDateString()}
        </span>
        <h2 className="text-amber-600 text-[17px] lg:text-[18px] my-3">
          {post.title}
        </h2>
        <p className="text-slate-400 text-sm text-start">{post.description}</p>
      </article>
      <div className="my-4">
        <CommentCom userId={post.userId} postId={post.id} />
      </div>
    </section>
  );
};

export default PostDetails;
