import { DiningHall, Item, Review, Tag, TagOnItem } from '@prisma/client';
import { useEffect, useState } from 'react';

interface UseItemsParams {
  showUnverified: 'true' | 'false';
}

export interface UseItemsItem extends Item {
  reviews: Review[];
  tags: TagOnItem[];
  diningHall: DiningHall;
}

const useItems = (params: UseItemsParams) => {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<UseItemsItem[]>([]);
  const [error, setError] = useState('');

  const refetch = () => {
    setLoading(true);
    setError('');

    const queryParams = new URLSearchParams({
      showUnverified: params.showUnverified,
    });

    fetch(`/api/item/get?${queryParams}`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((e) => {
        setError(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(refetch, [params.showUnverified]);

  return { loading, items, error, refetch };
};

export default useItems;
