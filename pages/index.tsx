import type { NextPage } from 'next';
import Hello from '../components/hello/Hello';
import Head from "next/head";

const Home: NextPage = () => {
  return <>
    <Head>
      <title>簡介 - 雪球筆記</title>
      <meta name="description" content="一款專為子彈筆記而生的應用"/>
    </Head>
    <Hello/>

  </>
}

export default Home
