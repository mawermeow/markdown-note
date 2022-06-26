import {FC, useState} from 'react';
import InputItem from "./InputItem";

import classes from "./LoginForm.module.css";
import {signIn} from "next-auth/client";
import {useRouter} from "next/router";
import FetchStatus from "../ui/card/FetchStatus";
import ContentCard from "../ui/card/ContentCard";
import TopButton from "../ui/card/TopButton";
import TopBorder from "../ui/card/TopBorder";
import MainBorder from "../ui/card/MainBorder";
import ActionBorder from "../ui/card/ActionBorder";


const createUser=async (username:string, password:string)=>{
    const response = await fetch('/api/auth/signup', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data:{message:string} = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Something went wrong!');
    }

    return data;
};


const LoginForm: FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoginMode, setIsLoginMode] = useState(true);
    const router = useRouter();
    const [fetchStatus,setFetchStatus] = useState({status:'',message:''});

    const loginHandler = async () => {
        setFetchStatus({status:'pending',message:'Logging in...'});
        const result = await signIn('credentials', {
            redirect: false,
            username,
            password
        });

        if (result && result.error) {
            setFetchStatus({status:'error',message:'Failed, please try again'});
            // setFetchStatus({status:'error',message:result.error});
        }else{
            setFetchStatus({status:'success',message:'Login successfully'});
            await router.replace('/notes');
        }
    };

    const autoLogin = async ()=>{
        setIsLoginMode(true);
        await loginHandler();
    };

    const signupHandler = async () => {
        try{
            setFetchStatus({status:'pending',message:'Registering...'});
            await createUser(username,password);
            setFetchStatus({status:'success',message:'Registration is complete'});
            await autoLogin();
        }catch (error) {
            if (error instanceof Error){
                setFetchStatus({status:'error',message:error.message});
            }
        }
    };

    return <ContentCard>
        <TopBorder>
            <div>
                <TopButton
                    isActive={isLoginMode}
                    onClick={()=>{setIsLoginMode(true)}}>
                    Login
                </TopButton>
                <TopButton
                    isActive={!isLoginMode}
                    onClick={()=>{setIsLoginMode(false)}}>
                    Signup
                </TopButton>
            </div>
            <FetchStatus fetchStatus={fetchStatus}/>
        </TopBorder>
        <MainBorder isLeft={isLoginMode} isVisible={true}>
            <div className={classes.loginFormInputItem}>
                <InputItem
                    type='username'
                    id='username'
                    placeholder='Username'
                    value={username}
                    onChange={(input) => {
                        setUsername(input);
                        setFetchStatus({status:'',message:''});
                    }}
                />
                <InputItem
                    type='password'
                    id='password'
                    placeholder='Password'
                    value={password}
                    onChange={(input) => {
                        setPassword(input);
                        setFetchStatus({status:'',message:''});
                    }}
                />
            </div>
            <ActionBorder>
                {isLoginMode ?
                    <button className={classes.icon} onClick={loginHandler}>
                        Login
                    </button>
                    : <div className={classes.icon} onClick={signupHandler}>
                        Sign Up
                    </div>}
            </ActionBorder>
        </MainBorder>
    </ContentCard>
};

export default LoginForm;