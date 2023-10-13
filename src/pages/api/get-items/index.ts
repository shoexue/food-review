import prisma from '@/lib/prisma';
import { NextApiHandler } from 'next';

// api request to create a review
const GET: NextApiHandler = async (req, res) => {
  const result = await prisma.item.findMany();
  res.json(result);
};

export default GET;
