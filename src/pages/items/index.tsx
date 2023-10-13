import ReviewButton from '@/components/ReviewButton';
import useItems from '@/hooks/useItems';
import Link from 'next/link';

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
          <div key={i.id} className="bg-gray-100 my-2">
            <Link href={`/items/${i.id}`}>
              <div className="hover:underline">
                <p>{i.name}</p>
                <p>{i.rating} / 10</p>
                <p>{i.totalReviews} total reviews</p>
              </div>
            </Link>
            <ReviewButton
              itemId={i.id}
              onSuccess={() => refetch()}
              onFail={() => {}}
            />
          </div>
        );
      })}
      <button
        className="bg-blue-200 px-4 py-3 rounded-md"
        onClick={() => {
          addItem();
        }}
      >
        Add Item
      </button>
    </div>
  );
}
