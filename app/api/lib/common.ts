export const ErrorResponse = async (message: string, code: number) => {
  return new Response(null, {
    status: code,
    statusText: message,
  });
};
