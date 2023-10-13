import { Review } from '@prisma/client';
import { useEffect, useState } from 'react';

interface UseReviewsParams {
  itemId: string;
}

const useReviews = (params: UseReviewsParams) => {
  const [loading, setLoading] = useState(false);
  const [reviews, setItems] = useState<Review[]>([]);
  const [error, setError] = useState('');

  const refetch = () => {
    if (!params.itemId) return;
    setLoading(true);
    setError('');

    const queryParams = new URLSearchParams({
      itemId: params.itemId,
    });

    fetch(`/api/get-reviews?${queryParams}`, {
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

  useEffect(refetch, [params.itemId]);

  return { loading, reviews, error, refetch };
};

export default useReviews;
