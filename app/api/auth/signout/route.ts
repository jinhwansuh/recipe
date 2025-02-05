import { revalidatePath } from 'next/cache';
import { deleteSession } from '~/lib/session';
import { ErrorResponse } from '../../lib/common';

export const POST = async () => {
  try {
    await deleteSession();
    revalidatePath('/');

    return new Response(JSON.stringify({ code: 1 }), {
      status: 200,
    });
  } catch (error: any) {
    return ErrorResponse(error.message || 'server error', 500);
  }
};
