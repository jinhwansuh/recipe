export const ErrorResponse = async (message: string, code: number) => {
  return new Response(null, {
    status: typeof code === 'number' ? code : 500,
    statusText: typeof message === 'string' ? message : 'server error',
  });
};
