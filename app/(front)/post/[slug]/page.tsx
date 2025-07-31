import { getPostBySlug, getPosts } from '@/utils/prisma/prismaPost';
import PostDetails from './PostDetails';
import type { Metadata } from 'next'

// ✅ SSG: pre-generate pages for each post
export const generateStaticParams = async () => {
  const posts = await getPosts();
  return posts.map((item) => ({
    slug: item.slug
  }))
}

// ✅ Dynamic Metadata for SEO & sharing
export const generateMetadata = async ({params}: {params: Promise<{slug: string}>}):Promise<Metadata> => {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if(!post) {
    return {
      title: "Post not found",
      description: "Post Description Not Found"
    }
  }

  return {
    title: post?.title,
    description: post?.description.slice(0, 160),
    keywords: post?.keywords || undefined,
    openGraph: {
      title: post?.title,
      description: post?.description.slice(0, 160),
      type: "article",
      url: `${process.env.BASE_URL}/${slug}`,
      images: [{url: post.image || "/images/slide-1.png", width: 800, height: 500}]
    }
   
  }
}

// ✅ Page Component
const SinglePost = async ({ params }: { params: Promise<{slug: string}> }) => {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) {
    return <div>Post not found</div>;
  }
  return (
    <main className='min-h-screen'>
      <PostDetails post={post} />
    </main>
  );
};

export default SinglePost;
