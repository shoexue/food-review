import prisma from '@/lib/prisma';
import { transformNameToSlug } from '@/lib/utils-backend';
import { NextApiHandler } from 'next';

// api request to create an item
const handle: NextApiHandler = async (req, res) => {
  const { name, imageUrl } = req.body;
  const result = await prisma.item.create({
    data: {
      name,
      imageUrl: imageUrl ?? '',
      slug: transformNameToSlug(name),
    },
  });
  res.json(result);
};

export default handle;
