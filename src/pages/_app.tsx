import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import useTags from '@/hooks/useTags';
import { getSnapshot } from 'mobx-state-tree';
import React, { useEffect } from 'react';
import { store } from '@/lib/types';
import useItems from '@/hooks/useItems';
import { observer } from 'mobx-react-lite';
import useDiningHalls from '@/hooks/useDiningHalls';

const App = observer(({ Component, pageProps }: AppProps) => {
  const { tags } = useTags();
  const { settings } = store;
  const { items } = useItems({
    showUnverified: settings.showUnverified ? 'true' : 'false',
  });
  const { diningHalls } = useDiningHalls();

  useEffect(() => {
    console.log('set itmes', items);
    store.init(items);
  }, [items]);

  useEffect(() => {
    store.tags.init(tags);
  }, [tags]);

  useEffect(() => {
    store.diningHalls.init(diningHalls);
  }, [diningHalls]);

  console.log('store', getSnapshot(store));

  return <Component {...pageProps} />;
});

export default App;
