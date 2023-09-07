import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
        <body className='grid dark:bg-zinc-600 bg-slate-300 p-3 md:p-6 text-base font-sans text-zinc-800 dark:text-zinc-50 -min-h-screen min-w-screen place-items-center content-start'>
          <Main />
          <NextScript />
        </body>
    </Html>
  )
}
