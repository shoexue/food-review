import { Item } from '@prisma/client';
import { useEffect, useState } from 'react';

const useItems = () => {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<Item[]>([]);
  const [error, setError] = useState('');

  const refetch = () => {
    setLoading(true);
    setError('');

    fetch('/api/get-items', {
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

  useEffect(refetch, []);

  return { loading, items, error, refetch };
};

export default useItems;
