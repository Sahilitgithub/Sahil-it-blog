import React from "react";
import ProductItem from "./PostItem";
import Image from "next/image";
import { data, PostTypes } from "@/utils/data";
import Link from "next/link";

const PostContainer = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-4 gap-2 my-1 px-4 md:px-16">
      <aside className="col-span-1">
        {/* Latest News Post */}
        <div>
          <h3 className="text-xl bg-sky-700 rounded-md px-1">Latest News</h3>
          <div className="w-full p-2 rounded-md h-[200px] sm:h-[300px] overflow-x-auto bg-black text-white">
            {data.map((item: PostTypes) => (
              <Link href={`/post/${item.id}`} key={item.id}>
                <article className="bg-[#001021] rounded-md flex gap-1 my-1">
                  <div className="bg-[#001021] rounded-md flex justify-center items-start gap-1">
                    <figure className="w-1/4">
                      <Image
                        src={item.image}
                        alt={item.title}
                        className="w-[80px] h-[80px] object-cover rounded-md"
                        width={500}
                        height={400}
                      />
                    </figure>
                    <div className="w-3/4">
                      <h2 className="text-[16px] text-green-900">
                        {item.title.slice(0, 20)}...
                      </h2>
                      <p className="text-[13px]">
                        {item.description.slice(0, 45)}...
                      </p>
                    </div>
                  </div>
                  <hr />
                </article>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-2">
          <h3 className="text-xl bg-sky-700 rounded-md px-1">Featured Posts</h3>
          <div className="w-full p-2 rounded-md h-[200px] sm:h-[300px] overflow-x-auto bg-black text-white">
          {data.map((item: PostTypes) => (
              <Link href={`/post/${item.id}`} key={item.id}>
                <article className="bg-[#001021] rounded-md flex gap-1 my-1">
                  <div className="bg-[#001021] rounded-md flex justify-center items-start gap-1">
                    <figure className="w-1/4">
                      <Image
                        src={item.image}
                        alt={item.title}
                        className="w-[80px] h-[80px] object-cover rounded-md"
                        width={500}
                        height={400}
                      />
                    </figure>
                    <div className="w-3/4">
                    <h2 className="text-[16px] text-green-900">
                        {item.title.slice(0, 20)}...
                      </h2>
                      <p className="text-[13px]">
                        {item.description.slice(0, 45)}...
                      </p>
                    </div>
                  </div>
                  <hr />
                </article>
              </Link>
            ))}
          </div>
        </div>
      </aside>
      <article className="col-span-3">
       <div className="grid grid-cols-1 md:grid-cols-4 gap-1">
         <div className="col-span-3">
          <input
            type="text"
            placeholder="Search Something"
            className="w-full rounded-md p-2 bg-black text-white"
          />
        </div>
        <div className="col-span-1">
          <select className="w-full p-3 rounded-md bg-black text-white">
            <option>Category</option>
            <option value="">category</option>
            <option value="">category</option>
            <option value="">category category</option>
            <option value="">category</option>
            <option value="">category</option>
            <option value="">category</option>
            <option value="">category</option>
            <option value="">category</option>
          </select>
        </div>
       </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 bg-black pb-4 p-2 rounded-md">
          {data.map((item: PostTypes) => (
            <ProductItem key={item.id} />
          ))}
        </div>
        {/* Paginaiton */}
        <div className="my-3">Paginaiton</div>
      </article>
    </section>
  );
};

export default PostContainer;
