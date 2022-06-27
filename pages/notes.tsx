import type {NextPage} from 'next';
import EditorsCard from "../components/Markdown/EditorsCard";
import {getSession, GetSessionOptions} from "next-auth/client";
import {CustomGetServerSideProps} from "../types/CustomServerSideProps";
import useJournal from "../hooks/useJournal";
import Loading from "../components/ui/loading/Loading";

const NotesPage: NextPage =  () => {

    const {journals} = useJournal();

    if(!journals){
        return <Loading/>;
    }
    return <EditorsCard contents={journals}/>;
}
export default NotesPage;


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