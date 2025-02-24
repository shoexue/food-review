import { Review } from '@prisma/client';

const makeReview = async (data: {
  score: number;
  review: string;
  title: string;
  itemId: string;
}): Promise<Review> => {
  const reviewData = {
    score: data.score + '',
    comment: data.review,
    title: data.title,
    itemId: data.itemId,
  };

  return await fetch('/api/review/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams(reviewData).toString(),
  }).then((res) => res.json());
};

export { makeReview };
