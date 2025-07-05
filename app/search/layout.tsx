import SearchInput from '~/components/common/SearchInput/SearchInput';
import SearchTabs from './components/SearchTabs';

export default function SearchLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SearchInput />
      <SearchTabs />
      {children}
    </>
  );
}
