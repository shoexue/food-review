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
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import SiteHeader from '@/components/SiteHeader';

const Home = observer(() => {
  const { items, settings, itemsInitialized } = store;

  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [reviewItemId, setReviewItemId] = useState('');
  console.log('Show unverified ', settings.showUnverified)
  const onItemReviewClick = (itemId: string) => {
    setReviewItemId(itemId);
    setReviewModalOpen(true);
  };

  console.log('items initialized? ', itemsInitialized);
  return (
    <div className='flex flex-col items-center gap-y-4 mx-12 md:mx-48'>
      <SiteHeader />
      {!itemsInitialized ? (
        <Spinner />
      ) : (
        <>
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
      <ReviewModal
        open={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
        itemId={reviewItemId}
      />
    </div>
  );
});

export default Home;
