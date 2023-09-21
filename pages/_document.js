import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" /> 
      </Head>
        <body className='font-medium grid dark:bg-zinc-600 bg-slate-300 md:p-6 text-base text-zinc-800 dark:text-zinc-50 -min-h-screen min-w-screen place-items-center content-start'>
          <Main />
          <NextScript />
        </body>
    </Html>
  )
}
