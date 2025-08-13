import { prisma } from '@/utils/prisma/prismaClient';

// DELETE
export async function DELETE(_request: Request, { params }: {params: Promise<{ id: string }>}) {
  try {
    const post = await prisma.post.delete({
      where: { id: (await params).id },
    });
    return Response.json(post, { status: 200 });
  } catch (error) {
    console.error('Post deleting error:', error);
    return Response.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

// PUT
export const PUT = async (request: Request, { params }: {params: Promise<{ id: string }>}) => {
  try {
    const data = await request.json();
    const { title, description, slug, image, keywords, category, featured } = data;
    const post = await prisma.post.update({
      where: { id: (await params).id },
      data: {
        title,
        description,
        category,
        featured: featured,
        slug,
        image,
        keywords: Array.isArray(keywords) ? keywords.join(', ') : keywords || '',
      },
    });

    return Response.json({ message: post }, { status: 201 });
  } catch (error) {
    console.error('Updating post error:', error);
    return Response.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

