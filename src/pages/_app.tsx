import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import useTags from '@/hooks/useTags';
import { getSnapshot } from 'mobx-state-tree';
import React, { useEffect } from 'react';
import { store } from '@/lib/types';
import useItems from '@/hooks/useItems';

export default function App({ Component, pageProps }: AppProps) {
  const { tags } = useTags();
  const { items } = useItems();

  useEffect(() => {
    store.init(items);
  }, [items]);

  useEffect(() => {
    store.tags.init(tags);
    console.log('set tags', getSnapshot(store.tags));
  }, [tags]);

  console.log('store', getSnapshot(store));

  return <Component {...pageProps} />;
}
