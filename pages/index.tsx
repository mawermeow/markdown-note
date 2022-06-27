import type { NextPage } from 'next';
import Hello from '../components/hello/Hello';

const Home: NextPage = () => {
  return <>
    <Hello/>
    {/*<EditorsCard contents={DUMMY_CONTENT}/>*/}
  </>
}

export default Home
