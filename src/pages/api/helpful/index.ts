import prisma from '@/lib/prisma';
import { NextApiHandler } from 'next';

// api request to vote that a rating was helpful

const handle: NextApiHandler = async (req, res) => {
  const { reviewId } = req.body;

  const item = await prisma.review.findUnique({ where: { id: reviewId } });
  if (!item) return res.json({});
  const result = await prisma.review.update({
    where: {
      id: reviewId,
    },
    data: {
      helpfulVotes: item.helpfulVotes + 1,
    },
  });

  return res.json(result);
};

export default handle;
