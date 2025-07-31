import EditPost from './editPost';
import { getPostBySlug } from '@/utils/prisma/prismaPost';

export default async function EditPostPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  
  const post = await getPostBySlug(slug);
  if (!post) return "Post not found";

    return (
      <div>
        <EditPost passPost={post} />
      </div>
    );
} 
