import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.tag.create({ data: { value: 'Vegan' } });
  await prisma.tag.create({ data: { value: 'Vegetarian' } });
  await prisma.tag.create({ data: { value: 'Halal' } });
  await prisma.tag.create({ data: { value: 'Spicy' } });
  await prisma.tag.create({ data: { value: 'Breakfast' } });
  await prisma.tag.create({ data: { value: 'Lunch' } });
  await prisma.tag.create({ data: { value: 'Dinner' } });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })

  .catch(async (e) => {
    console.error(e);

    await prisma.$disconnect();

    process.exit(1);
  });
