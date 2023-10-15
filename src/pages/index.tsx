'use client';

import Spinner from '@/components/Spinner';
import { observer } from 'mobx-react-lite';
import { store } from '@/lib/types';
import AddItemModal from '@/components/AddItemModal';
import ItemCard from '@/components/ItemCard';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PlusIcon } from '@heroicons/react/24/outline';
import ReviewModal from '@/components/ReviewModal';

const Home = observer(() => {
  const { items } = store;

  const [addItemModalOpen, setAddItemModalOpen] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [reviewItemId, setReviewItemId] = useState('');

  const onItemReviewClick = (itemId: string) => {
    setReviewItemId(itemId);
    setReviewModalOpen(true);
  };

  return (
    <div className='flex flex-col items-center gap-y-4 mx-12 md:mx-48'>
      <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center'>
        {"New Rez's Dishes"}
      </h1>
      {items.length === 0 ? (
        <Spinner />
      ) : (
        <>
          <Button onClick={() => setAddItemModalOpen(true)}>
            <PlusIcon className='w-4 h-4 mr-2' /> Item
          </Button>
          <div className='grid w-full grid-colc-1 lg:grid-cols-3 gap-4'>
            {items.map((i) => (
              <ItemCard
                item={i}
                key={i.id}
                onReviewClick={(itemId) => onItemReviewClick(itemId)}
              />
            ))}
          </div>
        </>
      )}
      <AddItemModal
        open={addItemModalOpen}
        onClose={() => setAddItemModalOpen(false)}
      />
      <ReviewModal
        open={reviewModalOpen}
        onClose={() => {
          setReviewModalOpen(false);
        }}
        itemId={reviewItemId}
      />
    </div>
  );
});

export default Home;
