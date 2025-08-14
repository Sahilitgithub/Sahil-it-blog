import PostAndFilter from "@/components/PostAndFilter";
import { getPostsCategory, getSpecificPost } from "@/utils/prisma/prismaPost";

// Home Page of root layout
export default async function Home() {
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
    </main>
  );
}
