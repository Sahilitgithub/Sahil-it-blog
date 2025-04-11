import React from "react";
import ProductItem from "./PostItem";
import Image from "next/image";
import { data, PostTypes } from "@/utils/data";
import Link from "next/link";

const PostContainer = () => {
  return (
    <section className="grid grid-cols-4 gap-2 my-1 px-4 md:px-16">
      <aside className="col-span-1">
        <div>
          <input
            type="text"
            placeholder="Search Something"
            className="w-full rounded-md p-2 bg-black text-white"
          />
        </div>
        <div className="my-2">
          <select className="w-full p-3 rounded-md bg-black text-white">
            <option>Category</option>
            <option value="">category</option>
            <option value="">category</option>
            <option value="">category</option>
            <option value="">category</option>
            <option value="">category</option>
            <option value="">category</option>
            <option value="">category</option>
            <option value="">category</option>
          </select>
        </div>
        {/* Latest News Post */}
        <div className="my-2">
          <h3 className="text-xl bg-sky-700 rounded-md px-1">Latest News</h3>
          <div className="w-full p-2 rounded-md h-[300px] overflow-x-auto bg-black text-white">
            {data.map((item: PostTypes) => (
              <Link href={`/post/${item.id}`} key={item.id}>
                <article className="bg-[#001021] rounded-md flex justify-center items-start gap-2 my-1">
                  <div className="bg-[#001021] rounded-md flex justify-center items-start gap-2">
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
                        {item.description.slice(0, 50)}...
                      </p>
                    </div>
                  </div>
                  <hr />
                </article>
              </Link>
            ))}
          </div>
        </div>

        <div className="my-2">
          <h3 className="text-xl bg-sky-700 rounded-md px-1">Featured Posts</h3>
          <div className="w-full p-2 rounded-md h-[300px] overflow-x-auto bg-black text-white">
          {data.map((item: PostTypes) => (
              <Link href={`/post/${item.id}`} key={item.id}>
                <article className="bg-[#001021] rounded-md flex justify-center items-start gap-2 my-1">
                  <div className="bg-[#001021] rounded-md flex justify-center items-start gap-2">
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
                        {item.description.slice(0, 50)}...
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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 bg-black pb-4 p-2 rounded-md">
          {data.map((item: PostTypes) => (
            <ProductItem key={item.id} posts={item} />
          ))}
        </div>
        {/* Paginaiton */}
        <div className="my-3">Paginaiton</div>
      </article>
    </section>
  );
};

export default PostContainer;
