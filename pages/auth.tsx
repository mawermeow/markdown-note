import type { NextPage } from 'next';
import LoginForm from "../components/form/LoginForm";
import {useEffect, useState} from "react";
import {getSession} from "next-auth/client";
import UserForm from "../components/form/UserForm";
import Loading from "../components/ui/loading/Loading";
import Head from "next/head";

const AuthPage: NextPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isLogin,setIsLogin] = useState(false);

    useEffect(() => {
        getSession().then(session => {
            if (!session) {
                setIsLoading(false);
            }else{
                setIsLoading(false);
                setIsLogin(true)
            }
        })
    }, []);

    if (isLoading) {
        return <Loading/>
    }

    if(isLogin){
        return <UserForm/>
    }
    return <>
        <Head>
            <title>登入頁面 - 雪球筆記</title>
            <meta name="description" content="準備好一起讓生活質量越滾越高吧！"/>
        </Head>
        <LoginForm/>
    </>;
}

export default AuthPage
