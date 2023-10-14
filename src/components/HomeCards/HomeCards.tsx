import { observer } from 'mobx-react-lite';
import { store } from '@/lib/types';
import { getImage } from '@/lib/utils';
import ReviewButton from '../ReviewButton';
import { Button } from '../ui/button';
import Image from 'next/image';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '../ui/card';
import { StarIcon } from '@heroicons/react/24/solid';

const HomeCards = observer(() => {
  const addItem = async () => {
    await fetch('/api/item/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        name: 'test ' + store.items.length,
      }),
    });

    // refetch();
  };

  return (
    <>
      <Button
        onClick={() => {
          addItem();
        }}
      >
        Add Item
      </Button>
      <div className='grid w-full grid-colc-1 lg:grid-cols-3 gap-4'>
        {store.items.map((i) => {
          return (
            <Card key={i.id} className='group-hover:bg-slate-50'>
              <Link href={`/${i.slug}`} className='group' key={i.id}>
                <CardContent className='bg-slate-100 flex items-center justify-center h-64'>
                  <div className='relative w-full h-full'>
                    <Image src={getImage(i.imageUrl)} fill alt='' />
                  </div>
                </CardContent>
                <CardHeader className='flex flex-row justify-between'>
                  <div>
                    <CardTitle className='group-hover:underline'>
                      {i.name}
                    </CardTitle>
                    <CardDescription>
                      {`${i.totalReviews} total reviews`}
                    </CardDescription>
                  </div>
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
                    <StarIcon className='w-4 h-4' />
                    <p className='align-middle'>{i.rating}/10</p>
                  </div>
                </CardHeader>
              </Link>
              <CardFooter>
                <ReviewButton itemId={i.id} />
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </>
  );
});

export default HomeCards;
