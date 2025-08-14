import PostAndFilter from "@/components/PostAndFilter";
import { getPosts, getPostsCategory, getSpecificPost } from "@/utils/prisma/prismaPost";
import Image from "next/image";

// Home Page of root layout
export default async function Home() {
  const posts = await getPosts();
  console.log(posts);
  // Get all categories
  const categores = await getPostsCategory();
  // Get FeaturedPost, LatestPost
  const { featuredPost, latestPost } = await getSpecificPost();
  return (
    <main className="">
      <PostAndFilter
        postCategory={categores}
        latestPosts={latestPost }
        featuredPosts={featuredPost}
      />
      {posts.map((item) => (
        <div key={item.id}>
          <Image src={item.image || ''} alt={item.title} width={500} height={300} />
        </div>
      ))}
    </main>
  );
}
