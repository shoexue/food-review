import ReviewButton from '@/components/ReviewButton';
import useReviews from '@/hooks/useReviews';
import { extractSlug, formatDate } from '@/lib/util';
import { useRouter } from 'next/router';

export default function Item() {
  const route = useRouter();
  const itemId = extractSlug(route.query.itemId);

  const { reviews, refetch } = useReviews({
    itemId,
  });

  return (
    <div>
      {reviews.map((r) => {
        return (
          <div key={r.id} className="bg-gray-100 my-2">
            <p>{r.score} / 10</p>
            <p>{r.comment}</p>
            <p>{formatDate(new Date(r.createdAt))}</p>
          </div>
        );
      })}

      <ReviewButton
        itemId={itemId}
        onSuccess={() => {
          refetch();
        }}
        onFail={() => {}}
      />
    </div>
  );
}
