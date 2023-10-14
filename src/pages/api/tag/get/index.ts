import prisma from '@/lib/prisma';
import { NextApiHandler } from 'next';

// api request to create a tag
const GET: NextApiHandler = async (req, res) => {
  const result = await prisma.tag.findMany();
  res.json(result);
};

export default GET;
