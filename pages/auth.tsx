import type { NextPage } from 'next';
import LoginForm from "../components/auth/LoginForm";
import {useEffect, useState} from "react";
import {getSession} from "next-auth/client";
import UserForm from "../components/auth/UserForm";
import Loading from "../components/ui/loading/Loading";

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
    return <LoginForm/>;
}

export default AuthPage
