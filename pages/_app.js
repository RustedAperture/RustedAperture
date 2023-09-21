import '../styles/globals.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false
import Layout from '../components/layout/Layout';
import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider } from "next-themes";
import { Sora } from '@next/font/google'

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
})

export default function App({ Component, pageProps }) {

  const getLayout = Component.getLayout || ((page) => page)

  return getLayout(
    <Layout>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Component {...pageProps} />
      </ThemeProvider>
      <Analytics />
    </Layout>
  );
}
