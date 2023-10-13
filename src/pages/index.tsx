import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <p>Home</p>
      <div className="mx-8">
        <Link href="/items" className="hover:underline">
          {'-> Items'}
        </Link>
      </div>
    </div>
  );
}
