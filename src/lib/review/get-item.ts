import { UseItemsItem } from '@/hooks/useItems';
import { Item } from '@prisma/client';

const getItem = (itemId: string): Promise<UseItemsItem> => {
  const queryParams = new URLSearchParams({ itemId });
  return fetch(`/api/item/get?${queryParams}`, {
    method: 'GET',
  }).then((res) => res.json());
};

export { getItem };
