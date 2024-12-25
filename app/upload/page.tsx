'use client';

import { Fragment } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, X } from 'lucide-react';
import { z } from 'zod';
import { Button } from '~/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';

const formSchema = z.object({
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

export default function ProfileForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      tag: '',
      ingredients: [{ name: '', amount: 0, unit: '' }],
      steps: [{ description: '' }],
      imageUrl: '',
      videoUrl: '',
      recipeAuthor: '',
    },
  });
  const {
    fields: ingredientFields,
    append: appendIngredient,
    remove: removeIngredient,
  } = useFieldArray({
    control: form.control,
    name: 'ingredients',
  });

  const {
    fields: stepFields,
    append: appendStep,
    remove: removeStep,
  } = useFieldArray({
    control: form.control,
    name: 'steps',
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder='title' {...field} />
              </FormControl>
              <FormDescription>
                This is your public display title.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='tag'
          render={({ field }) => (
            <FormItem>
              <FormLabel>아무 태그</FormLabel>
              <FormControl>
                <Input placeholder='tag' {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormLabel>ingredients</FormLabel>
        {ingredientFields.map((field, index) => (
          <Fragment key={field.id}>
            <div className='flex gap-3'>
              <FormField
                control={form.control}
                name={`ingredients.${index}.name`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder='name' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`ingredients.${index}.amount`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder='amount' {...field} type='number' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`ingredients.${index}.unit`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder='unit' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type='button'
                variant='ghost'
                size='icon'
                onClick={() => removeIngredient(index)}
              >
                <X className='h-4 w-4' />
              </Button>
            </div>
          </Fragment>
        ))}
        <div>
          <Button
            type='button'
            variant='outline'
            size='sm'
            onClick={() => appendIngredient({ name: '', amount: 0, unit: '' })}
            className='mt-2'
          >
            <Plus className='h-4 w-4 mr-2' /> 재료 추가
          </Button>
        </div>
        <FormLabel>steps</FormLabel>
        {stepFields.map((field, index) => (
          <Fragment key={field.id}>
            <div className='flex gap-3'>
              <FormField
                control={form.control}
                name={`steps.${index}.description`}
                render={({ field }) => (
                  <FormItem className=' w-full'>
                    <FormControl>
                      <Input placeholder='description' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type='button'
                variant='ghost'
                size='icon'
                onClick={() => removeStep(index)}
              >
                <X className='h-4 w-4' />
              </Button>
            </div>
          </Fragment>
        ))}

        <div>
          <Button
            type='button'
            variant='outline'
            size='sm'
            onClick={() => appendStep({ description: '' })}
            className='mt-2'
          >
            <Plus className='h-4 w-4 mr-2' /> 순서 추가
          </Button>
        </div>

        <FormField
          control={form.control}
          name='imageUrl'
          render={({ field }) => (
            <FormItem>
              <FormLabel>이미지 or 썸네일 url</FormLabel>
              <FormControl>
                <Input placeholder='imageUrl' {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='videoUrl'
          render={({ field }) => (
            <FormItem>
              <FormLabel>비디오 url</FormLabel>
              <FormControl>
                <Input placeholder='videoUrl' {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='recipeAuthor'
          render={({ field }) => (
            <FormItem>
              <FormLabel>레시피 출처</FormLabel>
              <FormControl>
                <Input placeholder='recipeAuthor' {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  );
}
