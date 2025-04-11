"use client";
import { PostTypes } from "@/utils/data";
import Image from "next/image";

interface PostDetailsProps {
  post: PostTypes;
}

const PostDetails = ({ post }: PostDetailsProps) => {
  console.log("post data ", post);
  return (
    <section className="bg-[#001021] text-white rounded-md p-2">
      <figure className="w-full h-[500px] rounded-md">
        <Image
          src={post.image}
          alt={post.title}
          width={500}
          height={600}
          className="w-full h-full object-cover rounded-md"
        />
      </figure>
      <article>
        <h2 className="text-amber-600 text-[17px] lg:text-[18px]">
          {post.title}
        </h2>
        <p className="text-slate-400 text-sm text-start">{post.description}</p>
      </article>
    </section>
  );
};

export default PostDetails;
