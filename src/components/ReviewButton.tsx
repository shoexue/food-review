import { PlusSmallIcon } from '@heroicons/react/24/outline';
import React from 'react';

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
    <button
      onClick={() => {
        makeReview();
      }}
    >
      <div className="flex items-center bg-gray-300 rounded-md px-4">
        <PlusSmallIcon className="w-4" />
        <span>Review</span>
      </div>
    </button>
  );
};

export default ReviewButton;
