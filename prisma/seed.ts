import { PrismaClient } from "@prisma/client";
import faker from "@faker-js/faker";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  if (process.env.NODE_ENV !== "development") {
    return
  }

  await prisma.post.deleteMany();
  await prisma.category.deleteMany();

  const email = "rachel@remix.run";

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  const hashedPassword = await bcrypt.hash("racheliscool", 10);

  const user = await prisma.user.create({
    data: {
      email,
      username: "rachelrox",
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });

  // create categories
  const category_1 = await prisma.category.create({
    data: {
      name: "Animes"
    },
  });

  const category_2 = await prisma.category.create({
    data: {
      name: "Trailers"
    },
  });

  // create posts
  const categories = [
    category_1.id,
    category_2.id
  ];

  for (let i = 0; i < 20; i++) {
    const randomNumber = Math.floor(Math.random() * categories.length);

    await prisma.post.create({
      data: {
        title: faker.lorem.sentence(),
        body: faker.lorem.sentence(),
        img_url: faker.image.imageUrl(),
        published: true,
        /// published: faker.datatype.boolean(),
        userId: user.id,
        categoryId: categories[randomNumber]
      },
    });
  }

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
