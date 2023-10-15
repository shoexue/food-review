import { IReview } from '@/lib/types/Review';
import { formatDate } from '@/lib/utils';
import React from 'react';
import { Button } from './ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from './ui/card';
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline';
import { store } from '@/lib/types';
import { IItem } from '@/lib/types/Item';
import { observer } from 'mobx-react-lite';

interface IReviewCardProps {
  review: IReview;
  item: IItem;
}

const ReviewCard: React.FC<IReviewCardProps> = observer(({ review, item }) => {
  const voteHelpful = (reviewId: string) => {
    if (!item) return;

    fetch('/api/helpful', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ reviewId }).toString(),
    })
      .then(() => {
        store
          .findItemById(item.id)
          ?.reviews.findReviewById(reviewId)
          ?.addHelpful();
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <Card key={review.id} className=''>
      <CardHeader>
        <div className='flex flex-row items-center'>
          {[...Array(review.rating)].map((s, i) => {
            return <StarSolidIcon key={i} className='w-4 h-4' />;
          })}
          {[...Array(10 - review.rating)].map((s, i) => {
            return <StarOutlineIcon key={i} className='w-4 h-4' />;
          })}
          <p className='align-middle'>{review.rating}/10</p>
        </div>
        <div>
          <CardTitle>{review.title}</CardTitle>
          <CardDescription>
            {formatDate(new Date(review.createdAt))}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <p className='ml-6 my-2'>{review.comment}</p>
      </CardContent>
      <CardFooter>
        <Button onClick={() => voteHelpful(review.id)}>
          {`${review.helpfulVotes} people found this review helpful.`}
        </Button>
      </CardFooter>
    </Card>
  );
});

export default ReviewCard;
