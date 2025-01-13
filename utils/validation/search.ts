import { z } from 'zod';

export const searchSchema = z.object({
  searchValue: z.string().min(1),
});

export type SearchValue = z.infer<typeof searchSchema>;
