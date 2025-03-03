import Link from 'next/link';
import Text from '~/components/common/Text/Text';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Card, CardContent } from '~/components/ui/card';
import { PAGE_ROUTES } from '~/constants/route';
import { Author } from '~/app/api/main/route';

interface AuthorCardProps {
  author: Author;
}

export default function AuthorCard({ author }: AuthorCardProps) {
  const {
    id,
    name,
    imageUrl,
    _count: { Recipe },
  } = author;

  return (
    <Link href={`${PAGE_ROUTES.AUTHOR}/${id}`}>
      <Card key={id} className='w-60 cursor-pointer p-4'>
        <CardContent className='flex items-center gap-4 p-0'>
          <Avatar>
            <AvatarImage src={imageUrl || 'https://placehold.co/400'} />
            <AvatarFallback>Profile</AvatarFallback>
          </Avatar>
          <div>
            <Text size={'subheading'}>{name}</Text>
            <Text size={'caption'} fontColor={'muted'}>
              레시피: {Recipe}
            </Text>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
