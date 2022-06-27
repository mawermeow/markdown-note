import {FC, FormEvent, useState} from 'react';
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
import useJournal from "../../hooks/useJournal";


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
    const {updateStatus} = useJournal()

    const loginHandler = async () => {
        updateStatus({status:'pending',message:'Logging in...'});
        const result = await signIn('credentials', {
            redirect: false,
            username,
            password
        });
        if (result && result.error) {
            updateStatus({status:'error',message:'Failed, please try again'});
            // setFetchStatus({status:'error',message:result.error});
        }
        updateStatus({status:'success',message:'Login successfully'});
        await router.replace('/notes');

    };

    const signupHandler = async () => {
        try{
            updateStatus({status:'pending',message:'Registering...'});
            await createUser(username,password);
            updateStatus({status:'success',message:'Registration is complete'});
            setIsLoginMode(true);
            await loginHandler();
        }catch (error) {
            if (error instanceof Error){
                updateStatus({status:'error',message:error.message});
            }
        }
    };

    const submitHandler = async (event:FormEvent)=>{
        event.preventDefault();

        if(!isLoginMode){
            await signupHandler()
        }
        await loginHandler();
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
            <FetchStatus/>
        </TopBorder>
        <form onSubmit={submitHandler}>
            <MainBorder isLeft={isLoginMode} isVisible={true}>
                <div className={classes.loginFormInputItem}>
                    <InputItem
                        type='username'
                        id='username'
                        placeholder='Username'
                        value={username}
                        onChange={(input) => {
                            setUsername(input);
                            updateStatus({status:'',message:''});
                        }}
                    />
                    <InputItem
                        type='password'
                        id='password'
                        placeholder='Password'
                        value={password}
                        onChange={(input) => {
                            setPassword(input);
                            updateStatus({status:'',message:''});
                        }}
                    />
                </div>
                <ActionBorder>
                        <button className={classes.icon}>
                            {isLoginMode ?'Login':'Sign Up'}
                        </button>
                </ActionBorder>
            </MainBorder>
        </form>
    </ContentCard>
};

export default LoginForm;