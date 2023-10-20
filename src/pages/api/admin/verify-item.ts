import prisma from '@/lib/prisma';
import { NextApiHandler } from 'next';

// api request to set an item verified/unverified
const handle: NextApiHandler = async (req, res) => {
  const { id, verified, password } = req.body;
  if (password != process.env.SECRET_KEY) {
    return res.json({});
  }

  const result = await prisma.item.update({
    where: { id },
    data: {
      verified: !!verified,
    },
  });
  return res.json(result);
};

export default handle;
