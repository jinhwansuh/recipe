import { getManyRecipe } from '~/lib/actions/recipeActions';
import ProfileHeader from '~/components/Header/ProfileHeader';
import SearchInput from '~/components/common/SearchInput/SearchInput';

export default async function Home() {
  const recipes = await getManyRecipe();

  return (
    <>
      <ProfileHeader />
      <SearchInput />

      <main>
        <section>
          <h2 className='mb-4 text-2xl font-semibold text-[#8355BE]'>
            Recipes
          </h2>
          <div>
            {recipes.map((recipe) => (
              <div key={recipe.id} className='flex justify-between'>
                <p>{recipe.title}</p>
                <div>{recipe.author.name}</div>
              </div>
            ))}
          </div>
        </section>
        {/* <section>
          <h2>Hot</h2>
          <div>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni,
            consequatur esse, tenetur dicta vitae libero delectus obcaecati
            reiciendis illum, eius quisquam asperiores! Assumenda aliquid
            reiciendis nam libero architecto tenetur repellendus!
          </div>
        </section>
        <section>
          <h2>Recommended Recipes</h2>
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae et
            autem voluptatem aliquam deserunt, laborum ab aliquid recusandae
            praesentium amet, optio nihil mollitia cumque veritatis nam
            dignissimos ipsam voluptas! Itaque.
          </div>
        </section> */}
      </main>
    </>
  );
}
