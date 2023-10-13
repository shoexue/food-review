import prisma from '@/lib/prisma';
import { NextApiHandler } from 'next';

// api request to update an item
const handle: NextApiHandler = async (req, res) => {
  const { name, imageUrl, id } = req.body;
  const result = await prisma.item.update({
    where: {
      id,
    },
    data: {
      name,
      imageUrl: imageUrl,
    },
  });
  res.json(result);
};

export default handle;
