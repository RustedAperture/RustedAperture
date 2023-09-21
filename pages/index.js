import Head from 'next/head'
import Layout from '../components/layout/Layout'
import IndexLayout from '../components/layout/IndexLayout'

export default function Index() {
  return (
    <>
      <Head>
        <title>Cameron Varley</title>
      </Head>
    </>
  )
}

Index.getLayout = function getLayout(page) {
  return (
    <IndexLayout />
  )
}