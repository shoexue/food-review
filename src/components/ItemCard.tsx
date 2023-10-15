import { IItem } from '@/lib/types/Item';
import { getImage } from '@/lib/utils';
import ReviewButton from './ReviewButton';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from './ui/card';
import Image from 'next/image';
import { StarIcon } from '@heroicons/react/24/solid';

import Link from 'next/link';
import { observer } from 'mobx-react-lite';
interface IItemCardProps {
  item: IItem;
}

const ItemCard: React.FC<IItemCardProps> = observer(({ item }) => {
  return (
    <Card key={item.id} className='group-hover:bg-slate-50'>
      <Link href={`/${item.slug}`} className='group' key={item.id}>
        <CardContent className='bg-slate-100 flex items-center justify-center h-64'>
          <div className='relative w-full h-full'>
            <Image src={getImage(item.imageUrl)} fill alt='' />
          </div>
        </CardContent>
        <CardHeader className='flex flex-row justify-between'>
          <div>
            <CardTitle className='group-hover:underline'>{item.name}</CardTitle>
            <CardDescription>
              {`${item.reviews.reviews.length} total reviews`}
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
            <p className='align-middle'>{item.rating}/10</p>
          </div>
        </CardHeader>
      </Link>
      <CardFooter>
        <ReviewButton itemId={item.id} />
      </CardFooter>
    </Card>
  );
});

export default ItemCard;
