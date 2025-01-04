import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from '~/components/ui/alert-dialog';
import RevealText from '../RevealText/RevealText';
import { Spinner } from '../ui/spinner';

export default function FullScreenLoading() {
  return (
    <AlertDialog open={true}>
      <AlertDialogContent className='border-0 bg-transparent'>
        <div className='text-center'>
          <Spinner />
          <RevealText text='Loading...' />
        </div>
        <AlertDialogHeader className='sr-only'>
          <AlertDialogTitle className='text-center'>loading</AlertDialogTitle>
          <AlertDialogDescription>loading</AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}
