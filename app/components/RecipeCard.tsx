import Link from 'next/link';
import Text from '~/components/common/Text/Text';
import { PAGE_ROUTES } from '~/constants/route';
import { Recipe } from '../api/main/route';

interface RecipeCardProps {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  const { id, title, tags, thumbnailUrl, author, viewCount, _count } = recipe;
  return (
    <Link
      href={`${PAGE_ROUTES.RECIPE}/${id}`}
      className='flex justify-between py-4'
    >
      <div>
        <p>{title}</p>
        <div className='flex gap-1'>
          <Text size={'caption'} fontColor={'muted'}>
            조회수: {viewCount}
          </Text>
          <Text size={'caption'} fontColor={'muted'}>
            |
          </Text>
          <Text size={'caption'} fontColor={'muted'}>
            평점: {_count.likes}
          </Text>
        </div>
      </div>
      <div>{author.name}</div>
    </Link>
  );
}
