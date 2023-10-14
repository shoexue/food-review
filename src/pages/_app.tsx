import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import useTags from '@/hooks/useTags';
import { getSnapshot } from 'mobx-state-tree';
import React, { useEffect } from 'react';
import { store } from '@/lib/types';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (!store.ready()) {
      fetch('/api/item/get', {
        method: 'GET',
      })
        .then((res) => res.json())
        .then((data) => {
          store.init(data);
        });
    }
  }, [store]);

  console.log('store', getSnapshot(store));
  const { tags } = useTags();
  // const { items, refetch, loading, error } = useItems();

  return <Component {...pageProps} />;
}
