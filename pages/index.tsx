import type { NextPage } from 'next';
import Hello from '../components/hello/Hello';
import MarkdownRange from "../components/Markdown/MarkdownRange";

const Home: NextPage = () => {
  return <>
    {/*<Hello/>*/}
    <MarkdownRange/>
  </>
}

export default Home
