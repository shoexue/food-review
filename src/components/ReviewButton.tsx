import { PlusSmallIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { Button } from "@/components/ui/button"

interface IReviewButtonProps {
  itemId: string;
  onSuccess: VoidFunction;
  onFail: VoidFunction;
}

const ReviewButton: React.FC<IReviewButtonProps> = ({
  itemId,
  onSuccess,
  onFail,
}) => {
  const makeReview = async () => {
    const reviewData = {
      score: 7 + '', // int out of ten
      comment: 'test',
      itemId,
    };
    try {
      const res = await fetch('/api/create-review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(reviewData).toString(),
      });
      console.log(res);
      onSuccess();
    } catch (e) {
      onFail();
    }
  };

  return (
    <Button
      onClick={() => {
        makeReview();
      }}
    >
      <PlusSmallIcon className="w-2 h-2 mr-2" /> Review
    </Button>
  );
};

export default ReviewButton;
