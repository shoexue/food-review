import { store } from '@/lib/types';
import { observer } from 'mobx-react-lite';
import type { GetServerSideProps } from 'next';

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

const Page = observer(() => {
  const { items } = store;

  return (
    <div>
      <p>Admin page</p>
      <div>
        {items.map((item) => {
          return (
            <div key={item.id}>
              <p>{item.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default Page;
