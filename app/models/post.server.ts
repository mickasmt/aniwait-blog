import type { User, Post, Category } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Post } from "@prisma/client";

export function getPosts() {
  return prisma.post.findMany({
    include: {
      category: true,
    },
    take: 8,
    orderBy: { updatedAt: "desc" },
  });
}

export function getPostsByCategory({ categoryName }: { categoryName: Category["name"] }) {
  return prisma.post.findMany({
    where: {
      category: {
        name: categoryName.toLowerCase()
      }
    },
    include: {
      category: true,
    },
    take: 8,
    orderBy: { updatedAt: "desc" },
  });
}

export function getPost({
  id
}: Pick<Post, "id">) {
  return prisma.post.findFirst({
    where: { id },
    include: {
      user: {
        select: {
          username: true,
        }
      },
      category: true,
    },
  });
}


export function createPost({
  body,
  title,
  imgUrl,
  userId,
  categoryId,
}: Pick<Post, "body" | "title" | "imgUrl"> & {
  userId: User["id"];
  categoryId: Category["id"];
}) {
  return prisma.post.create({
    data: {
      title,
      body,
      imgUrl,
      user: {
        connect: {
          id: userId,
        },
      },
      category: {
        connect: {
          id: categoryId,
        },
      },
    },
  });
}

export function deletePost({
  id,
  userId,
}: Pick<Post, "id"> & { userId: User["id"] }) {
  return prisma.post.deleteMany({
    where: { id, userId },
  });
}
