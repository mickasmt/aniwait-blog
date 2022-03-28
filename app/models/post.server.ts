import type { User, Post, Category } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Post } from "@prisma/client";

export function getPosts() {
  return prisma.post.findMany({
    orderBy: { updatedAt: "desc" },
  });
}

export function getPostsByCategory({ categoryName }: { categoryName: Category["name"] }) {
  return prisma.post.findMany({
    where: { 
      category: {
        name: categoryName
      }
     },
    // select: { id: true, title: true },
    orderBy: { updatedAt: "desc" },
  });
}

export function getPost({
  id,
  userId,
}: Pick<Post, "id"> & {
  userId: User["id"];
}) {
  return prisma.post.findFirst({
    where: { id, userId },
  });
}


export function createPost({
  body,
  title,
  userId,
  categoryId,
}: Pick<Post, "body" | "title"> & {
  userId: User["id"];
  categoryId: Category["id"];
}) {
  return prisma.post.create({
    data: {
      title,
      body,
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
