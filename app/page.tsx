import Link from 'next/link';
import { Fragment } from 'react';
import { API_BASE_URL, http } from '~/lib/http';
import ProfileHeader from '~/components/Header/ProfileHeader';
import SearchInput from '~/components/common/SearchInput/SearchInput';
import Text from '~/components/common/Text/Text';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Card, CardContent } from '~/components/ui/card';
import { Separator } from '~/components/ui/separator';
import { PAGE_ROUTES } from '~/constants/route';
import { GetMainApi } from './api/main/route';

export default async function Home() {
  if (!API_BASE_URL) {
    return null;
  }
  const data = await http<GetMainApi>('/api/main');

  return (
    <>
      <ProfileHeader />
      <SearchInput />

      <main className='flex flex-col gap-6 pt-6'>
        <section>
          <Text
            as={'h2'}
            weight={'bold'}
            size={'subheading'}
            fontColor={'foreground'}
            className='text-[#8355BE]'
          >
            Recipes
          </Text>
          <div className='flex flex-col py-4'>
            {data.recipes.map((recipe, index) => (
              <Fragment key={recipe.id}>
                <Link
                  href={`${PAGE_ROUTES.RECIPE}/${recipe.id}`}
                  className='flex justify-between py-4'
                >
                  <p>{recipe.title}</p>
                  <div>{recipe.author.name}</div>
                </Link>
                {data.recipes.length - 1 !== index && <Separator />}
              </Fragment>
            ))}
          </div>
        </section>

        <section>
          <Text
            as={'h2'}
            weight={'bold'}
            size={'subheading'}
            fontColor={'foreground'}
            className='text-[#8355BE]'
          >
            Authors
          </Text>
          <div className='flex flex-wrap gap-4 py-4'>
            {data.authors.map((author) => (
              <Card key={author.id} className='w-60 cursor-pointer p-4'>
                <CardContent className='flex items-center gap-4 p-0'>
                  <Avatar>
                    <AvatarImage
                      src={author.imageUrl || 'https://placehold.co/400'}
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <p>{author.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
