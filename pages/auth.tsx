import type { NextPage } from 'next';
import LoginForm from "../components/auth/LoginForm";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {getSession} from "next-auth/client";
import UserForm from "../components/auth/UserForm";


const AuthPage: NextPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isLogin,setIsLogin] = useState(false);
    const router = useRouter();

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
        return <p>Loading...</p>
    }

    if(isLogin){
        return <UserForm/>
    }
    return <LoginForm/>;
}

export default AuthPage
