import prisma from '@/lib/prisma';
import { NextApiHandler } from 'next';

// api request to create an item
const handle: NextApiHandler = async (req, res) => {
  const { name, imageUrl } = req.body;
  const result = await prisma.item.create({
    data: {
      name,
      imageUrl: imageUrl ?? '',
    },
  });
  res.json(result);
};

export default handle;
