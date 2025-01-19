import Link from 'next/link';
import { signOut } from '~/lib/actions/authActions';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Button } from '~/components/ui/button';
import { PAGE_ROUTES } from '~/constants/route';
import { auth } from '~/auth';

export default async function SearchHeader() {
  const session = await auth();

  const handleSignOutClick = async () => {
    'use server';
    await signOut();
  };

  return (
    <header className='flex h-16 items-center justify-between p-2'>
      <Link href={PAGE_ROUTES.MAIN}>RecipeHub</Link>

      <div className='flex items-center gap-4'>
        {/* <div>Keywords</div>
        <div>About</div> */}
        {session ? (
          <Avatar onClick={handleSignOutClick}>
            <AvatarImage src='https://github.com/shadcn.png' />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        ) : (
          <Link href={PAGE_ROUTES.SIGN_IN}>
            <Button>Signin</Button>
          </Link>
        )}
      </div>
    </header>
  );
}
