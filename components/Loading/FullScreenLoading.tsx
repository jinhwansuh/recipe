import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from '~/components/ui/alert-dialog';
import RevealText from '../RevealText/RevealText';
import { Spinner } from '../ui/spinner';

export default function FullScreenLoading() {
  return (
    <AlertDialog open={true}>
      <AlertDialogContent className='border-0 bg-transparent'>
        <AlertDialogHeader>
          <Spinner />
          <AlertDialogTitle className='text-center'>
            <RevealText text='Loading...' />
          </AlertDialogTitle>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}
