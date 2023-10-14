import { Item } from '@prisma/client';

const makeItem = async (data: { name: string }): Promise<Item> => {
  return fetch('/api/item/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      name: data.name,
    }),
  }).then((res) => res.json());
};

export { makeItem };
