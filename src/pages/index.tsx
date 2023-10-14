import ReviewButton from '@/components/ReviewButton';
import useItems from '@/hooks/useItems';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button';

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
    <div>
      {items.map((i) => {
        return (
          <Card key={i.id} className="">
            <CardHeader>
              <CardTitle className='hover:underline'>
                <Link href={`/${i.id}`}>
                  {i.name}
                </Link>
              </CardTitle>
              <CardDescription>
                <p>{i.totalReviews} total reviews</p>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="">
                <p>{i.rating} / 10</p>
              </div>
            </CardContent>
            <CardFooter>
              <ReviewButton
                itemId={i.id}
                onSuccess={() => refetch()}
                onFail={() => { }}
              />
            </CardFooter>
          </Card>
        );
      })}
      <Button
        onClick={() => {
          addItem();
        }}
      >
        Add Item
      </Button>
    </div>
  );
}
