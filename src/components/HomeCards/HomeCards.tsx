import { observer } from 'mobx-react-lite';
import { store } from '@/lib/types';
import { getImage } from '@/lib/utils';
import ReviewButton from '../ReviewButton';
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
import AddItemButton from '@/components/AddItemButton';

const HomeCards = observer(() => {
  const { items } = store;
  return (
    <>
      <AddItemButton />
      <div className='grid w-full grid-colc-1 lg:grid-cols-3 gap-4'>
        {items.map((i) => {
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
                      {`${i.reviews.reviews.length} total reviews`}
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
