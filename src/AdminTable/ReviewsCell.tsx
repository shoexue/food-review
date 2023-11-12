import { IReviewArray } from '@/lib/types/Review';

interface ReviewsCellProps {
  arr: IReviewArray;
}

const ReviewsCell: React.FC<ReviewsCellProps> = ({ arr }) => {
  console.log(arr);
  return <div>{`${arr.reviews.length}`}</div>;
};

export default ReviewsCell;
