import ReviewButton from '@/components/ReviewButton';
import useReviews from '@/hooks/useReviews';
import { extractSlug, formatDate } from '@/lib/utils';
import { useRouter } from 'next/router';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import useItems from '@/hooks/useItems';

export default function Item() {
  const route = useRouter();
  const itemId = extractSlug(route.query.itemId);
  const { items, refetch: refetchitems } = useItems();


  const { reviews, refetch } = useReviews({
    itemId,
  });

  return (
    <div className='flex flex-col items-center'>
      <h1></h1>
      <ReviewButton
        itemId={itemId}
        onSuccess={() => {
          refetch();
        }}
        onFail={() => { }}
      />
      {reviews.map((r) => {
        return (
          <Card key={r.id} className="w-96 m-auto my-4">
            <CardHeader>
              <CardTitle>
                {/* {r.title} */}
                Title
              </CardTitle>
              <CardDescription>
                {r.score}/10
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>{r.comment}</p>
            </CardContent>
            <CardFooter>
              <p>{formatDate(new Date(r.createdAt))}</p>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
