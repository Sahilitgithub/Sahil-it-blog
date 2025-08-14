"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Post } from "@prisma/client";
import PostsItem from "./PostItem";
import PaginantionCom from "./Paginantion";

interface PostAndFilterProps {
  postCategory: string[];
  latestPosts: Post[];
  featuredPosts: Post[];
}

const PostContainer: React.FC<PostAndFilterProps> = ({
  postCategory,
  latestPosts,
  featuredPosts,
}) => {
  const [query, setQuery] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const limit = 8; // Items per page

  // Fetch all filtering post useEffect
  useEffect(() => {
    // Fetch function
    const fetchPosts = async () => {
      setLoading(true);
      const params = new URLSearchParams();
      if (query) params.append("query", query);
      if (category) params.append("category", category);
      params.append("page", page.toString());
      params.append("limit", limit.toString());

      try {
        const response = await fetch(
          `/api/blog-post-filter?${params.toString()}`
        );
        const data = await response.json();
        // Pass posts here
        setPosts(data.data);
        // Set Total Pages of post
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [query, category, page]); // Depandency array

  return (
    <section className="grid grid-cols-1 md:grid-cols-4 gap-2 my-1 px-4 md:px-16 min-h-screen">
      {/* SIDEBAR */}
      <aside className="col-span-1">
        {/* Latest News Post */}
        <div>
          <h3 className="text-xl bg-sky-700 rounded-md px-1">Latest News</h3>
          <div className="w-full p-2 rounded-md h-[200px] sm:h-[300px] overflow-x-auto bg-black text-white">
            {loading ? (
              <p className="pl-2 text-white">Loading...!</p>
            ) : latestPosts.length === 0 ? (
              <p className="pl-2 text-white">No Posts Available</p>
            ) : (
              latestPosts.map((item) => (
                <Link href={`/post/${item.slug}`} key={item.id}>
                  <article className="bg-[#001021] rounded-md flex gap-1 my-1">
                    <figure className="w-1/4">
                      <Image
                        src={item.image ?? "/images/slide-1.png"}
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
                  </article>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Featured Posts */}
        <div className="mt-2">
          <h3 className="text-xl bg-sky-700 rounded-md px-1">Featured Posts</h3>
          <div className="w-full p-2 rounded-md h-[200px] sm:h-[300px] overflow-x-auto bg-black text-white">
            {loading ? (
              <p className="pl-2 text-white">Loading...!</p>
            ) : featuredPosts.length === 0 ? (
              <p className="pl-2 text-white">No Posts Available</p>
            ) : (
              featuredPosts.map((item) => (
                <Link href={`/post/${item.slug}`} key={item.id}>
                  <article className="bg-[#001021] rounded-md flex gap-1 my-1">
                    <figure className="w-1/4">
                      <Image
                        src={item.image ?? "/images/slide-1.png"}
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
                  </article>
                </Link>
              ))
            )}
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <article className="col-span-3">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-1">
          <div className="col-span-3">
            <input
              type="text"
              placeholder="Search Something"
              className="w-full rounded-md p-3 bg-black text-white"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1); // Reset to first page
              }}
            />
          </div>
          <div className="col-span-1">
            <select
              className="w-full p-3 rounded-md bg-black text-white"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setPage(1); // Reset to first page
              }}
            >
              <option value="">All Categories</option>
              {postCategory.map((item: string) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 bg-black pb-4 p-2 rounded-md mt-1">
          {loading ? (
            <p className="pl-2 text-white">Loading...!</p>
          ) : posts.length === 0 ? (
            <p className="pl-2 text-white">No Posts Available</p>
          ) : (
            posts.map((item) => <PostsItem key={item.id} post={item} />)
          )}
        </div>
        {/* Pagination */}
        <div className="my-3">
          <PaginantionCom currentPage={page} totalPages={totalPages} onPageChange={setPage} />
        </div>
      </article>
    </section>
  );
};

export default PostContainer;
