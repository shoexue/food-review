'use client';

import ReviewButton from '@/components/ReviewButton';
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
import {
  StarIcon as StarOutlineIcon,
  ArrowLeftIcon,
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { observer } from 'mobx-react-lite';
import { getSnapshot } from 'mobx-state-tree';
import { useMemo, useState } from 'react';
import { IItem } from '@/lib/types/Item';
import { store } from '@/lib/types';
import Spinner from '@/components/Spinner';

const Item = observer(() => {
  const route = useRouter();
  const slug = useMemo(() => extractSlug(route.query.slug), [route.query.slug]);
  const [item, setItem] = useState<IItem>();

  const { items } = store;

  if (items.length !== 0 && item === undefined) {
    const i = store.findItemBySlug(slug);
    if (i) {
      setItem(i);
    }
  }

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
    <div className='flex flex-col items-center gap-y-4 mx-12'>
      <Link href={'/'}>
        <Button className='absolute top-2 left-2'>
          <ArrowLeftIcon className='w-4 h-4 mr-2' /> Home
        </Button>
      </Link>
      {item ? (
        <>
          <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center'>
            {`New Rez ${item?.name ?? ''} Review's`}
          </h1>
          <Image
            src={getImage(item?.imageUrl)}
            width={300}
            height={300}
            alt=''
          />
          <ReviewButton itemId={item?.id ?? ''} />
          {/* COULD REMOVE THE REVIEW BUTTON AND JUST ADD THE FORM HERE */}
          <div className='grid grid-cols-1 gap-4 w-full max-w-2xl'>
            {item?.reviews.getItems().map((r) => {
              return (
                <Card key={r.id} className=''>
                  <CardHeader>
                    <div className='flex flex-row items-center'>
                      {[...Array(r.rating)].map((s, i) => {
                        return <StarSolidIcon key={i} className='w-4 h-4' />;
                      })}
                      {[...Array(10 - r.rating)].map((s, i) => {
                        return <StarOutlineIcon key={i} className='w-4 h-4' />;
                      })}
                      <p className='align-middle'>{r.rating}/10</p>
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
                    <Button onClick={() => voteHelpful(r.id)}>
                      {`${r.helpfulVotes} people found this review helpful.`}
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
});

export default Item;
