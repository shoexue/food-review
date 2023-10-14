import prisma from '@/lib/prisma';
import { NextApiHandler } from 'next';
import { Prisma } from '@prisma/client';

// api request to get a/many items
const GET: NextApiHandler = async (req, res) => {
  const slug = req.query['slug'];
  const itemId = req.query['itemId'];
  const includeParams: Prisma.ItemFindFirstArgs = {
    include: {
      tags: { include: { tag: true } },
      _count: { select: { reviews: true } },
    },
  };

  let result;

  if (itemId) {
    if (typeof itemId !== 'string') {
      result = {};
    } else {
      result = await prisma.item.findFirst({
        where: { id: itemId },
        ...includeParams,
      });
    }
  } else if (slug) {
    if (typeof slug !== 'string') {
    } else {
      result = await prisma.item.findFirst({
        where: { slug },
        ...includeParams,
      });
    }
  } else {
    result = await prisma.item.findMany({
      ...includeParams,
    });
  }

  return res.json(result);
};

export default GET;
