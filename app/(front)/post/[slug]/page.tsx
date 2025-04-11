import { data } from "@/utils/data";
import { PostTypes } from "@/utils/data";
import PostDetails from "./PostDetails";

const SinglePostPage = ({ params }: { params: { slug: string } }) => {
  const post: PostTypes | undefined = data.find(
    (post) => post.slug === params.slug
  );
  if (!post) return <h1>Post not found</h1>;

  return (
    <main>
      {/* Post details */}
      <div className="min-h-screen px-4 sm:px-28">
        <PostDetails post={post} />
      </div>
    </main>
  );
};

export default SinglePostPage;
