'use client';

import Spinner from '@/components/Spinner';
import { observer } from 'mobx-react-lite';
import { store } from '@/lib/types';
import AddItemButton from '@/components/AddItemButton';
import ItemCard from '@/components/ItemCard';

const Home = observer(() => {
  const { items } = store;

  return (
    <div className='flex flex-col items-center gap-y-4 mx-12 md:mx-48'>
      <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center'>
        {"New Rez's Dishes"}
      </h1>
      {items.length === 0 ? (
        <Spinner />
      ) : (
        <>
          <AddItemButton />
          <div className='grid w-full grid-colc-1 lg:grid-cols-3 gap-4'>
            {items.map((i) => (
              <ItemCard item={i} key={i.id} />
            ))}
          </div>
        </>
      )}
    </div>
  );
});

export default Home;
function useStore() {
  throw new Error('Function not implemented.');
}
