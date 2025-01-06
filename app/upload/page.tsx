'use client';

import { Fragment, useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, X } from 'lucide-react';
import { createRecipe, getAuthors } from '~/lib/actions/uploadActions';
import FullScreenLoading from '~/components/common/Loading/FullScreenLoading';
import SelectForm from '~/components/common/SelectForm/SelectForm';
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
import { SelectItem } from '~/components/ui/select';
import { useToast } from '~/hooks/use-toast';
import {
  uploadRecipeSchema,
  UploadRecipeValue,
} from '~/utils/validation/upload';
import { Units } from '~/constants/unit';

export default function ProfileForm() {
  const { toast } = useToast();
  const [isPending, setIsPending] = useState(false);
  const [authors, setAuthors] = useState<
    Awaited<ReturnType<typeof getAuthors>>
  >([]);
  const form = useForm<UploadRecipeValue>({
    resolver: zodResolver(uploadRecipeSchema),
    defaultValues: {
      title: '',
      tags: '',
      ingredients: [{ name: '', amount: 0, unit: '' }],
      steps: [
        {
          description: '',
        },
      ],
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

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const authors = await getAuthors();
        setAuthors(authors);
      } catch (error: any) {
        toast({
          variant: 'destructive',
          description: error.message || 'server error',
        });
      }
    };
    fetchAuthors();
  }, []);

  const onSubmit = async (values: UploadRecipeValue) => {
    console.log(values);
    try {
      setIsPending(true);
      await createRecipe(values);
      toast({
        description: 'upload successful',
      });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        description: error.message || 'server error',
      });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <>
      {isPending && <FullScreenLoading />}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormLabel>recipe title</FormLabel>
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
            name='tags'
            render={({ field }) => (
              <FormItem>
                <FormLabel>any tags</FormLabel>
                <FormControl>
                  <Input placeholder='tags' {...field} />
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
                    <FormItem className='flex-1'>
                      <FormControl>
                        <SelectForm
                          onChange={field.onChange}
                          value={field.value}
                          placeholder='Unit'
                        >
                          {Units.map((unit) => (
                            <SelectItem key={unit} value={unit}>
                              {unit}
                            </SelectItem>
                          ))}
                        </SelectForm>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {index !== 0 && (
                  <Button
                    type='button'
                    variant='ghost'
                    size='icon'
                    onClick={() => removeIngredient(index)}
                  >
                    <X className='h-4 w-4' />
                  </Button>
                )}
              </div>
            </Fragment>
          ))}
          <div>
            <Button
              type='button'
              variant='outline'
              size='sm'
              onClick={() =>
                appendIngredient({ name: '', amount: 0, unit: '' })
              }
              className='mt-2'
            >
              <Plus className='mr-2 h-4 w-4' /> 재료 추가
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
                    <FormItem className='w-full'>
                      <FormControl>
                        <Input placeholder='description' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {index !== 0 && (
                  <Button
                    type='button'
                    variant='ghost'
                    size='icon'
                    onClick={() => removeStep(index)}
                  >
                    <X className='h-4 w-4' />
                  </Button>
                )}
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
              <Plus className='mr-2 h-4 w-4' /> 순서 추가
            </Button>
          </div>

          <FormField
            control={form.control}
            name='imageUrl'
            render={({ field }) => (
              <FormItem>
                <FormLabel>image or thumbnail url</FormLabel>
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
                <FormLabel>video url</FormLabel>
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
                <FormLabel>recipe author</FormLabel>
                <SelectForm
                  onChange={field.onChange}
                  value={field.value}
                  placeholder='Select Author'
                >
                  {authors.map((author) => (
                    <SelectItem key={author.id} value={author.id}>
                      {author.name}
                    </SelectItem>
                  ))}
                </SelectForm>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' className='w-full'>
            Upload
          </Button>
        </form>
      </Form>
    </>
  );
}
