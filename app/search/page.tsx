'use client';

import { useSearchParams } from 'next/navigation';

export default function SearchPage() {
  const query = useSearchParams();

  return (
    <>
      <div>search</div>
      <div>{query.get('query')}</div>
    </>
  );
}
