import { prisma } from "~/db.server";

export function getLatestPosts() {
  return prisma.post.findMany({
    where: {
      published: true,
    },
    select: {
      id: true,
      title: true,
      img_url: true,
      createdAt: true,
      category: {
        select: {
          id: true,
          name: true,
        }
      },
    },
    take: 4,
    orderBy: { updatedAt: "desc" },
  });
}

export function getTrailers() {
  return prisma.post.findMany({
    where: {
      published: true,
      category: {
        name: 'trailers'
      }
    },
    select: {
      id: true,
      title: true,
      img_url: true,
      createdAt: true,
      category: {
        select: {
          id: true,
          name: true,
        }
      },
    },
    take: 4,
    orderBy: { updatedAt: "desc" },
  });
}