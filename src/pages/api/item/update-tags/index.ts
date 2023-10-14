import prisma from '@/lib/prisma';
import { NextApiHandler } from 'next';

// api request to update an item
const handle: NextApiHandler = async (req, res) => {
  const { id, tags } = req.body;
  if (!Array.isArray(tags)) {
    return res.json({});
  }
  const result = await prisma.item.update({
    where: { id },
    data: {
      tags: {
        set: tags.map((t: string) => {
          return { itemId_tagId: { itemId: id, tagId: t } };
        }),
      },
    },
  });
  return res.json(result);
};

export default handle;
