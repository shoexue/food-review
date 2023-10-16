// api route to verify an item

import prisma from '@/lib/prisma';
import { NextApiHandler } from 'next';

// api request to set an item verified/unverified
const handle: NextApiHandler = async (req, res) => {
  const { id, verified } = req.body;
  const result = await prisma.item.update({
    where: { id },
    data: {
      verified: !!verified,
    },
  });
  return res.json(result);
};

export default handle;
