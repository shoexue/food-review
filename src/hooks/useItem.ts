import { Item } from '@prisma/client';
import { useEffect, useState } from 'react';

type _S = { slug: string };
type _I = { itemId: string };
type UseItemParams = _S | _I;

const emptyItem: Item = {
  id: '',
  createdAt: new Date(),
  updatedAt: new Date(),
  name: '',
  rating: 0,
  imageUrl: '',
  slug: '',
  verified: false,
  diningHallId: '',
};

const useItem = (params: UseItemParams) => {
  const [loading, setLoading] = useState(false);
  const [item, setItems] = useState<Item>(emptyItem);
  const [error, setError] = useState('');

  const refetch = () => {
    setLoading(true);
    setError('');

    const queryParams = new URLSearchParams(params);

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

  // @ts-ignore
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(refetch, [params.slug, params.itemId]);

  return { loading, item, error, refetch };
};

export default useItem;
