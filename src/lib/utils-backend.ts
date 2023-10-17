import prisma from './prisma';

const transformNameToSlug = async (name: string) => {
  const transformed = name;

  transformed.replace("'", '');
  transformed.replace(' ', '-');

  const base = transformed;
  let slug = transformed;
  let num = 0;
  let item = await prisma.item.findFirst({
    where: { slug },
  });

  while (item != null) {
    slug = base + '-' + num;
    item = await prisma.item.findFirst({
      where: { slug },
    });
    num++;
  }

  return slug;
};

export { transformNameToSlug };
