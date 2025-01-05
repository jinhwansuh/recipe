export default function UploadLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='py-4 px-4'>
      <div className='py-4'>Upload</div>
      {children}
    </div>
  );
}
