'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function Search() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query');

  return (
    <div>
      <div>search: {query}</div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <Search></Search>
    </Suspense>
  );
}
