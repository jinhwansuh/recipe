'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Search } from 'lucide-react';
import { Form, FormControl, FormField, FormItem } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { searchSchema, SearchValue } from '~/utils/validation/search';
import { SearchQueryKey } from '~/constants/key';
import { PAGE_ROUTES } from '~/constants/route';

export default function SearchInput() {
  const router = useRouter();

  const form = useForm<SearchValue>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      searchValue: '',
    },
  });

  function onSubmit(data: SearchValue) {
    router.push(`${PAGE_ROUTES.SEARCH}?${SearchQueryKey}=${data.searchValue}`);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='relative w-full'>
        <FormField
          control={form.control}
          name='searchValue'
          render={({ field }) => (
            <FormItem>
              <div className='absolute left-1.5 top-1/2 -translate-y-1/2 transform'>
                <Search size={18} className='text-muted-foreground' />
              </div>
              <FormControl>
                <Input
                  className='pl-8'
                  placeholder='Search by ingredient or recipe name'
                  data-cy='search-input'
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
