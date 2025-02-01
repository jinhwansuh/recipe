export const http = async <T>(
  input: Parameters<typeof fetch>[0],
  init?: Parameters<typeof fetch>[1],
): Promise<T> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}${input}`,
    init,
  );
  return response.json() as Promise<T>;
};
