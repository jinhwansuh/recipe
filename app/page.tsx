import Link from 'next/link';
import { SearchInput } from '~/src/components/Main';
import { Text } from '~/src/components/atomic';
import * as S from './page.css';

export default async function Home() {
  return (
    <>
      <header className={S.HeaderContainer}>
        <Link href={'/'}>
          <Text fontStyle='subtitle'>RecipeHub</Text>
        </Link>
        <nav>
          <ul className={S.HeaderWrapper}>
            <li>Keywords</li>
            <li>About</li>
          </ul>
        </nav>
      </header>
      <main>
        <section>
          <Text as='h2' fontStyle='title'>
            Find a Recipe
          </Text>
          <SearchInput />
        </section>

        <section>
          <Text as='h2' fontStyle='title'>
            Popular Recipes
          </Text>
          <div>
            <div>card</div>
          </div>
        </section>

        <section>
          <Text as='h2' fontStyle='title'>
            Recipe Keywords
          </Text>

          <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
            {['Breakfast', 'Lunch', 'Dinner', 'Dessert'].map((category) => (
              <Link
                key={category}
                href={`/category/${category.toLowerCase()}`}
                className='bg-gray-100 p-4 rounded-md text-center hover:bg-gray-200 transition-colors'
              >
                {category}
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
