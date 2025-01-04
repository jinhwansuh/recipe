import { z } from 'zod';

export const uploadRecipeSchema = z.object({
  title: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  tag: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  ingredients: z.array(
    z.object({
      name: z.string().min(1, { message: 'Ingredient name is required' }),
      amount: z.coerce.number().min(0.0001, { message: 'Amount is required' }),
      unit: z.string().min(1, { message: 'Unit is required' }),
    }),
  ),
  steps: z.array(
    z.object({
      description: z
        .string()
        .min(1, { message: 'Step description is required' }),
    }),
  ),
  imageUrl: z.string(),
  videoUrl: z.string(),
  recipeAuthor: z.string(),
});

export type UploadRecipeValue = z.infer<typeof uploadRecipeSchema>;
