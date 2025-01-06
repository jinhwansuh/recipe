import Image from 'next/image';
import { signOut } from '~/lib/actions/authActions';
import ThemeButton from '~/components/common/ThemeButton/ThemeButton';
import { Button } from '~/components/ui/button';
import { auth } from '~/auth';

export default async function Home() {
  const session = await auth();

  return (
    <div className='grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20'>
      <ThemeButton />

      <main className='row-start-2 flex flex-col items-center gap-8 sm:items-start'>
        <div>
          <div>{JSON.stringify(session)}</div>
          <div>{JSON.stringify(session?.user)}</div>
        </div>
        {session ? (
          <form
            action={async () => {
              'use server';
              await signOut();
            }}
          >
            <Button type='submit'>sign out</Button>
          </form>
        ) : (
          <div>{JSON.stringify(session)}</div>
        )}
      </main>
      <footer className='row-start-3 flex flex-wrap items-center justify-center gap-6'>
        <a
          className='flex items-center gap-2 hover:underline hover:underline-offset-4'
          href='https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'
        >
          <Image
            aria-hidden
            src='/file.svg'
            alt='File icon'
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className='flex items-center gap-2 hover:underline hover:underline-offset-4'
          href='https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'
        >
          <Image
            aria-hidden
            src='/window.svg'
            alt='Window icon'
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className='flex items-center gap-2 hover:underline hover:underline-offset-4'
          href='https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'
        >
          <Image
            aria-hidden
            src='/globe.svg'
            alt='Globe icon'
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
