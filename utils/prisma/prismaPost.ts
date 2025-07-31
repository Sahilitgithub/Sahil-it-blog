import { PrismaClient, Post } from "@prisma/client";
import { Prisma } from "@prisma/client";
const prisma = new PrismaClient();

// Get all post
export const getPosts = async () => {
  const posts = await prisma.post.findMany();
  return posts;
};

// Get a post by slug
export const getPostBySlug = async (slug: string) => {
  const post = await prisma.post.findUnique({
    where: { slug },
  });
  return post;
};

// 🔍 Search blog posts by search query and category all posts
interface SearchFilterOptions {
  query?: string;
  category?: string;
  skip?: number;
  take?: number;
}

export const searchFilter = async ({
  query,
  category,
  skip,
  take,
}: SearchFilterOptions): Promise<{ posts: Post[]; total: number }> => {
  const filters: Prisma.PostWhereInput[] = [];

  if (query) {
    filters.push({
      OR: [
        { title: { contains: query, mode: "insensitive" as const } },
        { description: { contains: query, mode: "insensitive" as const } },
      ],
    });
  }

  if (category) {
    filters.push({
      category: {
        equals: category,
        mode: "insensitive" as const,
      },
    });
  }

  const where: Prisma.PostWhereInput = filters.length > 0 ? { AND: filters } : {};

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take,
    }),
    prisma.post.count({ where }),
  ]);

  return { posts, total };
};


// Get all post's category list
export const getPostsCategory = async () => {
  const posts = await prisma.post.findMany({
    select: {
      category: true,
    },
    where: {
      category: {
        not: null,
      },
    },
  });

  // Extract and deduplicate category strings
  const categories = [
    ...new Set(posts.map((post) => post.category)),
  ] as string[];
  return categories;
};

/// Get only latest post
export const getSpecificPost = async () => {
  const latestPost = await prisma.post.findMany({
    where: {
      featured: "Latest Post",
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const featuredPost = await prisma.post.findMany({
    where: {
      featured: "Featured Post",
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return { latestPost, featuredPost };
};

// Get all Users
export const getUsers = async () => {
  const users = await prisma.user.findMany();
  return users;
};
