import prisma from '@/lib/prisma';
import { NextApiHandler } from 'next';

// api request to create a review
const handle: NextApiHandler = async (req, res) => {
  const { score, comment, itemId } = req.body;
  const result = await prisma.review.create({
    data: {
      score: parseInt(score),
      comment,
      itemId,
    },
  });

  const item = await prisma.item.findUnique({ where: { id: itemId } });

  if (item == null) {
    return res.json({});
  }

  const newRating =
    (item.totalReviews * item.rating + parseInt(score)) /
    (item.totalReviews + 1);

  await prisma.item.update({
    where: {
      id: itemId,
    },
    data: {
      rating: newRating,
      totalReviews: item.totalReviews + 1,
    },
  });

  res.json(result);
};

export default handle;
