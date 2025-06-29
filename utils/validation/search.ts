import { z } from 'zod';
import { SearchQueryKey, SearchTargetKey } from '~/constants/key';

export const searchSchema = z.object({
  [SearchQueryKey]: z.string().min(1),
  [SearchTargetKey]: z.enum(['title', 'author', 'ingredient']).optional(),
});

export type SearchValue = z.infer<typeof searchSchema>;
