'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import FullScreenLoading from '~/components/Loading/FullScreenLoading';
import { Button } from '~/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { useToast } from '~/hooks/use-toast';
import {
  uploadAuthorSchema,
  UploadAuthorValue,
} from '~/utils/validation/upload';
import { createAuthor } from '~/lib/actions/uploadActions';

export default function ProfileForm() {
  const [isPending, setIsPending] = useState(false);
  const { toast } = useToast();
  const form = useForm<UploadAuthorValue>({
    resolver: zodResolver(uploadAuthorSchema),
    defaultValues: {
      name: '',
      youtubeUrl: '',
      youtubeId: '',
      imageUrl: '',
    },
  });

  const onSubmit = async (values: UploadAuthorValue) => {
    try {
      setIsPending(true);
      await createAuthor(values);
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
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>name</FormLabel>
                <FormControl>
                  <Input placeholder='name' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='youtubeUrl'
            render={({ field }) => (
              <FormItem>
                <FormLabel>youtubeUrl</FormLabel>
                <FormControl>
                  <Input placeholder='youtubeUrl' {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='youtubeId'
            render={({ field }) => (
              <FormItem>
                <FormLabel>youtubeId</FormLabel>
                <FormControl>
                  <Input placeholder='youtubeId' {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='imageUrl'
            render={({ field }) => (
              <FormItem>
                <FormLabel>imageUrl</FormLabel>
                <FormControl>
                  <Input placeholder='imageUrl' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type='submit' disabled={isPending}>
            Submit
          </Button>
        </form>
      </Form>
    </>
  );
}
