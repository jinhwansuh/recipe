export const API_BASE_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.NEXT_PUBLIC_BASE_URL
    : process.env.NEXT_PUBLIC_BASE_URL;

export const http = async <T>(
  input: Parameters<typeof fetch>[0],
  init?: Parameters<typeof fetch>[1],
): Promise<T> => {
  const response = await fetch(`${API_BASE_URL}${input}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...init,
  });

  if (!response.ok) throw new Error(response.statusText);
  return response.json() as Promise<T>;
};

export const errorResponse = (error: any) => {
  return new Response(`${error.message || 'server error'}`, {
    status: error.code || 500,
  });
};
