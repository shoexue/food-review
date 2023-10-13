import prisma from '@/lib/prisma';
import { NextApiHandler } from 'next';

// api request to get reviews for an item
const GET: NextApiHandler = async (req, res) => {
  const itemId = req.query['itemId'] as string;

  let result;

  if (typeof itemId === 'string') {
    result = await prisma.review.findMany({
      where: { itemId },
    });
  } else if (typeof itemId === 'string') {
    result = await prisma.review.findMany({
      where: {
        itemId: { in: itemId },
      },
    });
  } else {
    result = await prisma.review.findMany();
  }

  return res.json(result);
};

export default GET;
