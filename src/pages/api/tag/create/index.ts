import prisma from '@/lib/prisma';
import { NextApiHandler } from 'next';

// api request to create a tag
const handle: NextApiHandler = async (req, res) => {
  const { value } = req.body;
  const result = await prisma.tag.create({
    data: { value },
  });
  res.json(result);
};

export default handle;
