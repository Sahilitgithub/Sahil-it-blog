"use client";
import Image from "next/image";

const PostDetails = () => {
  
  return (
    <section className="bg-[#001021] text-white rounded-md p-2">
      <figure className="w-full h-[500px] rounded-md">
        <Image
          src={'/images/slide-1.png'}
          alt={'Post item image'} 
          width={500}
          height={600}
          className="w-full h-full object-cover rounded-md"
        />
      </figure>
      <article>
        <h2 className="text-amber-600 text-[17px] lg:text-[18px]">
          Post title
        </h2>
        <p className="text-slate-400 text-sm text-start">Post description</p>
      </article>
    </section>
  );
};

export default PostDetails;
