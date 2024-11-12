'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button, Input } from '~/components/atomic';
import * as S from './SearchInput.css';

interface SearchInputProps {
  defaultValue?: string;
}

export default function SearchInput({ defaultValue }: SearchInputProps) {
  const router = useRouter();
  const [value, setValue] = useState('');

  const handleSearchClick = () => {
    if (!value) return;

    router.push(`/search?query=${encodeURIComponent(value)}`);
  };

  return (
    <div className={S.InputWrapper}>
      <Input
        data-cy='search-input'
        onChange={(e) => setValue(e.target.value)}
        defaultValue={defaultValue}
      />
      <Button data-cy='search-button' onClick={handleSearchClick}>
        Search
      </Button>
    </div>
  );
}
