import { getManyAuthor } from '~/lib/actions/authorActions';
import { getMainPageRecipe } from '~/lib/actions/recipeActions';
import ProfileHeader from '~/components/Header/ProfileHeader';
import SearchInput from '~/components/common/SearchInput/SearchInput';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Card, CardContent } from '~/components/ui/card';

export default async function Home() {
  const recipes = await getMainPageRecipe();
  const authors = await getManyAuthor();

  return (
    <>
      <ProfileHeader />
      <SearchInput />

      <main className='flex flex-col gap-12 pt-10'>
        <section>
          <h2 className='mb-4 text-2xl font-semibold text-[#8355BE]'>
            Recipes
          </h2>
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className='flex cursor-pointer justify-between'
            >
              <p>{recipe.title}</p>
              <div>{recipe.author.name}</div>
            </div>
          ))}
        </section>

        <section>
          <h2 className='mb-4 text-2xl font-semibold text-[#8355BE]'>
            Authors
          </h2>
          {authors.map((author) => (
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
        </section>
      </main>
    </>
  );
}
