export const http = async <T>(
  input: string | URL | globalThis.Request,
  init?: RequestInit,
): Promise<T> => {
  const response = await fetch(`${process.env.BASE_URL}${input}`, init);
  return response.json() as Promise<T>;
};
