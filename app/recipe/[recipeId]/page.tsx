import { http } from '~/lib/http';
import ProfileHeader from '~/components/Header/ProfileHeader';
import Text from '~/components/common/Text/Text';
import { GetRecipeApi } from '~/app/api/recipe/route';

export default async function Recipe({
  params,
}: {
  params: Promise<{ recipeId: string }>;
}) {
  const id = (await params).recipeId;
  const data = await http<GetRecipeApi>(`/api/recipe?recipeId=${id}`);

  return (
    <>
      <ProfileHeader />

      <main>
        <div>
          <Text
            as={'h2'}
            weight={'bold'}
            size={'heading'}
            fontColor={'foreground'}
          >
            {data?.title}
          </Text>

          <div>{data?.viewCount}</div>
        </div>

        <div>
          <Text
            as={'h3'}
            weight={'bold'}
            size={'subheading'}
            fontColor={'foreground'}
          >
            Tags
          </Text>
          <div>
            {data?.tags.map((el, index) => (
              <div key={index} className='flex gap-4'>
                <div>{el}</div>
              </div>
            ))}
          </div>
        </div>

        <section>
          <Text
            as={'h3'}
            weight={'bold'}
            size={'subheading'}
            fontColor={'foreground'}
          >
            Ingredients
          </Text>
          <div>
            {(data?.ingredients).map((ingredient, index) => (
              <div key={index} className='flex gap-4'>
                <div>{ingredient.name}</div>
                <div>{ingredient.amount}</div>
                <div>{ingredient.unit}</div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <Text
            as={'h3'}
            weight={'bold'}
            size={'subheading'}
            fontColor={'foreground'}
          >
            Steps
          </Text>
          <div>
            {data?.steps.map((step, index) => (
              <div key={index}>
                <p>{step}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
