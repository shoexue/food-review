'use client';

import Spinner from '@/components/Spinner';
import HomeCards from '@/components/HomeCards/HomeCards';
import { observer } from 'mobx-react-lite';
import { getSnapshot } from 'mobx-state-tree';
import { store } from '@/lib/types';
import AddItemButton from '@/components/AddItemButton';

const Home = observer(() => {
  console.log('render with store', getSnapshot(store));
  return (
    <div className='flex flex-col items-center gap-y-4 mx-12 md:mx-48'>
      <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center'>
        {"New Rez's Dishes"}
      </h1>
      {!store.ready() ? <Spinner /> : <HomeCards />}
    </div>
  );
});

export default Home;
function useStore() {
  throw new Error('Function not implemented.');
}
