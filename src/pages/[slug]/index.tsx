import ReviewButton from '@/components/ReviewButton';
import useReviews from '@/hooks/useReviews';
import { extractSlug, formatDate, getImage } from '@/lib/utils';
import { useRouter } from 'next/router';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import useItem from '@/hooks/useItem';
import {
  StarIcon as StarOutlineIcon,
  ArrowLeftIcon,
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Spinner from '@/components/Spinner';

export default function Item() {
  const route = useRouter();
  const slug = extractSlug(route.query.slug);

  const { item, loading, refetch: refetchitem } = useItem({ slug });

  console.log(item);

  const { reviews, refetch } = useReviews({
    itemId: item?.id ?? '',
  });

  const voteHelpful = (reviewId: string) => {
    fetch('/api/helpful', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({ reviewId }).toString(),
    }).then(() => refetch());
  };

  return (
    <div className='flex flex-col items-center gap-y-4 mx-12'>
      <Link href={'/'}>
        <Button className='absolute top-2 left-2'>
          <ArrowLeftIcon className='w-4 h-4 mr-2' /> Home
        </Button>
      </Link>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center'>
            {`New Rez ${item.name ?? ''} Review's`}
          </h1>
          <Image
            src={getImage(item.imageUrl)}
            width={300}
            height={300}
            alt=''
          />
          <ReviewButton
            itemId={item.id}
            onSuccess={refetch}
            onFail={() => { }}
          />
        </>
      )}
      {/* COULD REMOVE THE REVIEW BUTTON AND JUST ADD THE FORM HERE */}
      <div className='grid grid-cols-1 gap-4 w-full max-w-2xl'>
        {reviews.map((r) => {
          return (
            <Card key={r.id} className=''>
              <CardHeader>
                <div className='flex flex-row items-center'>
                  {[...Array(r.rating)].map((s) => {
                    return <StarSolidIcon key={s} className='w-4 h-4' />;
                  })}
                  {[...Array(10 - r.rating)].map((s) => {
                    return <StarOutlineIcon key={s} className='w-4 h-4' />;
                  })}
                  {/* <p className='align-middle'>{r.rating}/10</p> */}
                </div>
                <div>
                  <CardTitle>{r.title}</CardTitle>
                  <CardDescription>
                    {formatDate(new Date(r.createdAt))}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className='ml-6 my-2'>{r.comment}</p>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() => {
                    voteHelpful(r.id);
                  }}
                >
                  {`${r.helpfulVotes} people found this review helpful.`}
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
