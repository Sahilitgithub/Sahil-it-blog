"use client";
import { Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export interface PostTypes {
  id: number;
  title: string;
  slug: string;
  description: string;
  category: string;
  latestPost: boolean;
  featuredPost: boolean;
  keywords: string[];
}

export const postsData = [
  {
    id: 1,
    title: "this is post number one",
    slug: "1",
    description: "o kira o kira modu modu post description",
    category: "Latest Posts",
    latestPost: false,
    featuredPost: false,
    keywords: [
      "latest post",
      "post one",
      "post two",
      "post three",
      "post four",
      "post five",
    ],
  },

  {
    id: 2,
    title: "this is post number two",
    slug: "2",
    description: "o kira o kira modu modu post description",
    category: "Latest Posts",
    latestPost: false,
    featuredPost: false,
    keywords: [
      "latest post",
      "post one",
      "post two",
      "post three",
      "post four",
      "post five",
    ],
  },
  {
    id: 3,
    title: "this is post number three",
    slug: "3",
    description: "o kira o kira modu modu post description",
    category: "Latest Posts",
    latestPost: false,
    featuredPost: false,
    keywords: [
      "latest post",
      "post one",
      "post two",
      "post three",
      "post four",
      "post five",
    ],
  },
  {
    id: 4,
    title: "this is post number four",
    slug: "4",
    description: "o kira o kira modu modu post description",
    category: "Latest Posts",
    latestPost: false,
    featuredPost: false,
    keywords: [
      "latest post",
      "post one",
      "post two",
      "post three",
      "post four",
      "post five",
    ],
  },
  {
    id: 5,
    title: "this is post number four",
    slug: "5",
    description: "o kira o kira modu modu post description",
    category: "Latest Posts",
    latestPost: false,
    featuredPost: false,
    keywords: [
      "latest post",
      "post one",
      "post two",
      "post three",
      "post four",
      "post five",
    ],
  },
];

const AllPost = () => {
  const [posts, setPosts] = useState<PostTypes[]>(postsData);

  const deletePost = (id: number): void => {
    setPosts((prev) => prev.filter((post) => post.id !== id));
  };

  return (
    <div>
      <h1 className="text-[15px] sm:text-[17px] bg-slate-950 p-2 rounded-md">
        All Posts({posts.length})
      </h1>
      <div className="bg-slate-950 p-2 py-6 rounded-md overflow-x-auto">
        <table className="text-center">
          <thead className="bg-slate-800 rounded-lg p-2">
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Description</th>
              <th>Category</th>
              <th>Latest Post</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post: PostTypes) => {
              return (
                <tr key={post.id} className="hover:bg-slate-900">
                  <td>{post.id}</td>
                  <td>{post.title.slice(0, 12)}...</td>
                  <td>{post.description.slice(0, 12)}...</td>
                  <td>{post.category}</td>
                  <td>{post.latestPost ? "Yes" : "No"}</td>
                  <td>
                    <Link href={`/dashboard/post/${post.id}`}>Edit</Link>
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={() => deletePost(post.id)}
                      className="inline-block"
                    >
                      <Trash2 size={20} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllPost;
