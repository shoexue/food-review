import { AdminTable } from '@/AdminTable/AdminTable';
import { columns } from '@/AdminTable/column-defs';
import { store } from '@/lib/types';
import { observer } from 'mobx-react-lite';
import type { GetServerSideProps } from 'next';
import React from 'react';

export const getServerSideProps = (async (context) => {
  const password = context.query['password'];

  if (!password || password !== process.env.SECRET_KEY) {
    return {
      redirect: {
        permanent: true,
        destination: '/',
        basePath: true,
      },
      props: {},
    };
  }

  return { props: {} };
}) satisfies GetServerSideProps<{}>;

const Page: React.FC<{}> = observer(() => {
  const { items } = store;

  return (
    <div>
      <p>Admin page</p>
      <div>
        <AdminTable
          //@ts-ignore
          columns={columns}
          data={items}
          key={JSON.stringify(items)}
        />
      </div>
    </div>
  );
});

export default Page;
