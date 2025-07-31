"use client";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// Types of Post
export interface PostTypes {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  slug: string;
  description: string;
  category: string | null;
  featured: string | null;
  keywords: string | null;
  image: string | null;
  userId: string;
}

const AllPost = ({posts}: {posts: PostTypes[]}) => {
  const [postsData, setPostsData] = useState<PostTypes[]>(posts);

  // Delete Post Function
  const deletePost = async (id: string) => {
    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: "DELETE"
      })
      if(!response.ok) throw new Error("Failed to delete post")
      setPostsData((prevPosts) => prevPosts.filter((post) => post.id !== id));
    } catch (error) {
      console.log("Post deleting error", error);
    }
  };



  return (
    <div>
      {/* Title Part */}
      <h1 className="text-[15px] sm:text-[17px] bg-slate-950 p-2 rounded-md">
        All Posts({postsData.length})
      </h1>
      {/* Table of post */}
      <div className="bg-slate-950 p-2 py-6 rounded-md h-[300px] overflow-x-auto">
        <table className="text-center">
          <thead className="bg-slate-800 rounded-lg p-2">
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Description</th>
              <th>Category</th>
              <th>Latest Post</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {postsData?.map((post: PostTypes) => {
              return (
                <tr key={post.id} className="hover:bg-slate-900">
                  <td className="w-[60px] h-[60px]"> 
                    <Image src={post.image || '/images/slide-1.png'} alt={post.title} 
                    width={60} height={60} className="w-full h-full object-cover rounded-md"  />
                  </td>
                  <td>{post.title.slice(0, 12)}...</td>
                  <td>{post.description.slice(0, 12)}...</td>
                  <td>{post.category}</td>
                  <td>{post.featured}</td>
                  <td>
                    <Link href={`/dashboard/posts/${post.slug}`}>Edit</Link>
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
