'use client';

import { useSearchParams } from 'next/navigation';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query');

  return (
    <div>
      <div>search: {query}</div>
    </div>
  );
}
