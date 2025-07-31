"use client";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface CommentProps {
  userId: string;
  postId: string;
  comment: string;
}

interface CommentsTypes {
  id: string;
  userId: string;
  postId: string;
  comment: string;
  createdAt: string;
}

const CommentCom = ({ userId, postId }: { userId: string; postId: string }) => {
  const [comments, setComments] = useState<CommentsTypes[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CommentProps>({
    defaultValues: {
      userId: userId,
      postId: postId,
      comment: "",
    },
  });

  // Fetch comments
  const fetchComments = useCallback(async () => {
    try {
      const res = await fetch(`/api/comments?postId=${postId}`);
      const data = await res.json();
      console.log("data ", data)
      setComments(data);
    } catch (error) {
      console.error("Failed to fetch comments", error);
    }
  }, [postId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const onSubmit: SubmitHandler<CommentProps> = async (form) => {
    try {
      const resposne = await fetch(`/api/comments`, {
        method: "POST",
        headers: {
           "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!resposne.ok) throw new Error("Failed to submit comment");

      reset({
        comment: "",
      }); // ✅ Clear comment form
      fetchComments(); //
    } catch (error) {
      console.log("Error Submiting Comment", error);
    }
  };

  return (
    <div className="mt-4 lg:w-3/5">
      <h2 className="text-lg font-semibold text-white bg-black inline-block p-1 rounded-md">Leave a Comment</h2>
      {/* Textarea text box */}
      <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
        <textarea
          rows={3}
          className="w-full rounded-md border border-sky-600 bg-black text-white p-2"
          placeholder="Write your comment..."
          {...register("comment", {
            required: "Comment is required",
            maxLength: {
              value: 200,
              message: "You can not use more than 200 charactors",
            },
          })}
        />
        {errors?.comment?.message && (
          <span className="text-red-600 text-sm">{errors.comment.message}</span>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 rounded-md px-3 p-1"
        >
          {isSubmitting ? "Submit..." : "Submit"}
        </button>
      </form>

        {/* Comment conditional redering part */}
      <div className="">
        {comments.length === 0 ? (
            <p className="text-gray-400 bg-black rounded-md p-2 border border-sky-800">No comments yet.</p>
        ) : comments.map((item) => (
            <div key={item.id} className="flex gap-2 mt-1 bg-black rounded-md p-2 border border-sky-800">
          <figure className="w-[40px] h-[40px] bg-blue-800 rounded-full overflow-hidden">
            <Image
              src={"/images/avatar.png"}
              alt={ item.comment || "User Avatar"}
              width={40}
              height={40}
              className="rounded-full w-full h-full object-cover"
            />
          </figure>
          <div>
            <p className="text-sm font-semibold text-blue-500">Romjan</p>
            <p className="text-sm text-white mt-1">{item.comment}</p>
          </div>
        </div>
        ))}
      </div>
    </div>
  );
};

export default CommentCom;
