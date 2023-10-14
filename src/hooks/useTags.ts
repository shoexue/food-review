import { Tag } from '@prisma/client';
import { useEffect, useState } from 'react';

const useTags = () => {
  const [loading, setLoading] = useState(false);
  const [tags, setItems] = useState<Tag[]>([]);
  const [error, setError] = useState('');

  const refetch = () => {
    setLoading(true);
    setError('');

    fetch('/api/tag/get', {
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

  return { loading, tags, error, refetch };
};

export default useTags;
