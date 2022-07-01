import {getSession} from "next-auth/client";
import {useRouter} from "next/router";
import Head from "next/head";
import {useContext} from "react";
import JournalContext from "../../../store/JournalContext";
import Loading from "../../../components/ui/loading/Loading";
import EditorsCard from "../../../components/tiptap/EditorsCard";
import {CustomGetServerSideProps} from "../../../types/CustomServerSideProps";
import useJournal from "../../../hooks/useJournal";

const NotePage = () => {
    const router = useRouter();
    const noteTitle = router.query.title;
    const {journals} = useJournal();
    const {username} = useContext(JournalContext);

    const head = <Head>
        <title>{noteTitle} - 雪球筆記</title>
        <meta name="description" content={`${username}的筆記`}/>
    </Head>

    if(!journals){
        return <Loading/>;
    }

    return <>
        {head}
        <EditorsCard contents={journals}
                 readTag={typeof noteTitle==='string'? noteTitle:undefined}/>;
    </>
};

export const getServerSideProps:CustomGetServerSideProps = async (context)=> {
    const session = await getSession({req:context.req});

    if(!session) {
        return{
            redirect:{
                destination:'/auth', // 描述重新定向的位置
                permanent:false // 它是永久的還是只有一次
            }
        }
    }
    return{
        props:{session}
    }
}

export default NotePage;