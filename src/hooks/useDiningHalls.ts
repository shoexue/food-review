import { DiningHall } from '@prisma/client';
import { useEffect, useState } from 'react';

const useDiningHalls = () => {
  const [loading, setLoading] = useState(false);
  const [diningHalls, setDiningHalls] = useState<DiningHall[]>([]);
  const [error, setError] = useState('');

  const refetch = () => {
    setLoading(true);
    setError('');

    fetch('/api/dining-hall/get', {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        setDiningHalls(data);
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

  return { loading, diningHalls, error, refetch };
};

export default useDiningHalls;
