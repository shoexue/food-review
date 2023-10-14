import prisma from '@/lib/prisma';
import { Item, TagOnItem } from '@prisma/client';
import { NextApiHandler } from 'next';

// api request to update an item
const handle: NextApiHandler = async (req, res) => {
  const { id, slug } = req.body;
  const result = await prisma.item.update({
    where: {
      id,
    },
    data: { slug },
  });
  res.json(result);
};

export default handle;
