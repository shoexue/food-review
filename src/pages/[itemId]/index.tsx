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
} from '@/components/ui/card';
import useItems from '@/hooks/useItems';
import {
  StarIcon as StarOutlineIcon,
  ArrowLeftIcon,
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Item() {
  const route = useRouter();
  const itemId = extractSlug(route.query.itemId);
  const { items, refetch: refetchitems } = useItems();

  const { reviews, refetch } = useReviews({
    itemId,
  });

  return (
    <div className='flex flex-col items-center gap-y-4 mx-12'>
      <Link href={'/'}>
        <Button className='absolute top-2 left-2'>
          <ArrowLeftIcon className='w-4 h-4 mr-2' /> Home
        </Button>
      </Link>
      <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center'>
        New Rez {/*i.name*/} Review's
      </h1>
      {/* ADD AN IMAGE */}
      {/* COULD REMOVE THE REVIEW BUTTON AND JUST ADD THE FORM HERE */}
      <ReviewButton
        itemId={itemId}
        onSuccess={() => {
          refetch();
        }}
        onFail={() => {}}
      />
      <div className='grid grid-cols-1 gap-4 w-full max-w-2xl'>
        {reviews.map((r) => {
          return (
            <Card key={r.id} className=''>
              {/* <CardHeader className='flex flex-row justify-between'> */}
              <CardHeader className=''>
                <div className='flex flex-row items-center'>
                  {/* {[...Array(r.score)].map((s) => {
                    return (
                      <StarSolidIcon key={s} className="w-4 h-4" />
                    );
                  })
                  }
                  {[...Array(10 - r.score)].map((s) => {
                    return (
                      <StarOutlineIcon key={s} className="w-4 h-4" />
                    );
                  })
                  } */}
                  <StarSolidIcon className='w-4 h-4' />
                  <p className='align-middle'>{r.score}/10</p>
                </div>
                <div>
                  <CardTitle>
                    {/* {r.title} */}
                    Title
                  </CardTitle>
                  <CardDescription>
                    {formatDate(new Date(r.createdAt))}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p>{r.comment}</p>
              </CardContent>
              <CardFooter>
                {/* _ people found this review helpful. */}
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
