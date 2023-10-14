import ReviewButton from '@/components/ReviewButton';
import useItems from '@/hooks/useItems';
import Link from 'next/link';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';

export default function Home() {
  const { items, refetch } = useItems();

  console.log(items);

  const addItem = async () => {
    await fetch('/api/create-item', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        name: 'test',
      }),
    });

    refetch();
  };

  return (
    <div className='flex flex-col items-center gap-y-4 mx-12 md:mx-48'>
      <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center'>
        {"New Rez's Dishes"}
      </h1>
      <Button
        onClick={() => {
          addItem();
        }}
      >
        Add Item
      </Button>
      <div className='grid w-full grid-colc-1 lg:grid-cols-3 gap-4'>
        {items.map((i) => {
          return (
            <Link href={`/${i.id}`} className='group' key={i.id}>
              <Card key={i.id} className='group-hover:bg-slate-50'>
                <CardContent className='bg-slate-100 flex items-center justify-center h-64'>
                  <div className='relative w-full h-full'>
                    <Image
                      src={
                        i.imageUrl === ''
                          ? 'https://static.ezrahuang.com/file/new-res-meal-review/Screenshot 2023-05-28 103355.png'
                          : i.imageUrl
                      }
                      // width={1000}
                      // height={256}
                      fill
                      alt=''
                    />
                  </div>
                </CardContent>
                <CardHeader className='flex flex-row justify-between'>
                  <div>
                    <CardTitle className='group-hover:underline'>
                      {i.name}
                    </CardTitle>
                    <CardDescription>
                      <p>{i.totalReviews} total reviews</p>
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
                    <StarSolidIcon className='w-4 h-4' />
                    <p className='align-middle'>{i.rating}/10</p>
                  </div>
                </CardHeader>
                <CardFooter>
                  <ReviewButton
                    itemId={i.id}
                    onSuccess={() => refetch()}
                    onFail={() => {}}
                  />
                </CardFooter>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
