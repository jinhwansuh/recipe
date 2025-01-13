export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) {
  const query = (await searchParams).query;

  return (
    <>
      <div>search</div>
      <div>{query}</div>
    </>
  );
}
