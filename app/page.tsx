import { Suspense } from 'react';
import ProfileHeader from '~/components/common/Header/ProfileHeader';
import SearchInput from '~/components/common/SearchInput/SearchInput';
import { Spinner } from '~/components/ui/spinner';
import MainContent from './src/components/MainContent';

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <>
      <ProfileHeader />
      <SearchInput />

      <Suspense fallback={<Spinner />}>
        <MainContent />
      </Suspense>
    </>
  );
}
