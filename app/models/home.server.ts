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
      category: {
        select: {
          id: true,
          name: true,
        }
      },
    },
    take: 8,
    orderBy: { updatedAt: "desc" },
  });
}

export function getTrailers() {
  return prisma.post.findMany({
    where: {
      published: true,
      category: {
        name: 'Trailers'
      }
    },
    select: {
      id: true,
      title: true,
      img_url: true,
    },
    take: 4,
    orderBy: { updatedAt: "desc" },
  });
}