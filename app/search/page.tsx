import { http } from '~/lib/http';
import { SearchQueryKey, SearchTabKey, SearchTabValue } from '~/constants/key';
import { GetSearchApi } from '../api/search/route';

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{
    [SearchQueryKey]: string;
    [SearchTabKey]?: string;
  }>;
}) {
  const query = (await searchParams)[SearchQueryKey];
  const tab = (await searchParams)[SearchTabKey] || SearchTabValue.TITLE;

  if (!query) {
    return <div>검색어가 없습니다.</div>;
  }

  const data = await http<GetSearchApi>(
    `/api/search?${SearchQueryKey}=${query}&${SearchTabKey}=${tab}`,
  );

  return (
    <>
      <div>search</div>
      <div>
        {query} {tab}
      </div>
    </>
  );
}
