import prisma from '@/lib/prisma';
import { NextApiHandler } from 'next';
import { Prisma } from '@prisma/client';

// api request to get a/many items
const GET: NextApiHandler = async (req, res) => {
  const slug = req.query['slug'];
  const itemId = req.query['itemId'];
  const showUnverified = req.query['showUnverified'];

  const params: Prisma.ItemFindFirstArgs = {
    include: {
      tags: { include: { tag: true } },
      _count: { select: { reviews: true } },
    },
  };

  const whereParams: Prisma.Args<typeof prisma.item, 'findFirst'>['where'] = {};

  if (showUnverified !== undefined) {
    whereParams.verified = showUnverified === 'true' ? undefined : true;
  }

  let result;

  if (itemId) {
    if (typeof itemId !== 'string') {
      result = {};
    } else {
      result = await prisma.item.findFirst({
        where: { ...whereParams, id: itemId },
        ...params,
      });
    }
  } else if (slug) {
    if (typeof slug !== 'string') {
    } else {
      result = await prisma.item.findFirst({
        where: { ...whereParams, slug },
        ...params,
      });
    }
  } else {
    result = await prisma.item.findMany({
      ...params,
      where: whereParams,
    });
  }

  return res.json(result);
};

export default GET;
