import { PrismaClient } from "@prisma/client";
import faker from "@faker-js/faker";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  // cleanup the existing database
  await prisma.review.deleteMany();
  await prisma.post.deleteMany();
  await prisma.category.deleteMany();
  await prisma.password.deleteMany();
  await prisma.user.deleteMany();

  // create ADMIN user
  const email = "rachel@remix.run";

  const hashedPassword = await bcrypt.hash("racheliscool", 10);

  const user = await prisma.user.create({
    data: {
      email,
      role: "ADMIN",
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
      name: "animes"
    },
  });

  const category_2 = await prisma.category.create({
    data: {
      name: "trailers"
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
        body: faker.lorem.paragraphs(10, '<br/><br/>\n'),
        imgUrl: faker.image.imageUrl(),
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
