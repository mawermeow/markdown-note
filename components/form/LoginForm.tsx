import {FC, FormEvent, useContext, useState} from 'react';
import InputItem from "../ui/form/InputItem";
import {signIn} from "next-auth/client";
import {useRouter} from "next/router";
import FetchStatus from "../ui/card/top/FetchStatus";
import ContentCard from "../ui/card/ContentCard";
import TopButton from "../ui/card/top/TopButton";
import TopBorder from "../ui/card/top/TopBorder";
import MainFormBorder from "../ui/form/MainFormBorder";
import JournalContext from "../../store/JournalContext";
import TopButtonDiv from "../ui/card/top/TopButtonDiv";

const LoginForm: FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoginMode, setIsLoginMode] = useState(true);
    const router = useRouter();
    const {updateStatus} = useContext(JournalContext);

    const loginHandler = async () => {
        updateStatus({status:'pending',message:'Logging in...'});
        const result = await signIn('credentials', {
            redirect: false,
            username,
            password
        });
        if (result && !result.error) {
            updateStatus({status:'success',message:'Login successfully'});
            await router.replace('/notes');

        }else{
            updateStatus({status:'error',message:result?.error||'Failed, please try again'});
        }
        return;


    };

    const signupHandler = async () => {
        updateStatus({status:'pending',message:'Registering...'});

        const response = await fetch('/api/auth/signup', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data:{message:string} = await response.json();

        if (response.ok) {
            updateStatus({status:'success',message:'Registration is complete'});
            setIsLoginMode(true);
            await loginHandler();
        }else{
            updateStatus({status:'error',message:data.message});
        }
    };

    const submitHandler = async (event:FormEvent)=>{
        event.preventDefault();

        if(!isLoginMode){
            await signupHandler()
        }else{
            await loginHandler();
        }
    };

    return <ContentCard>
            <FetchStatus/>
        <TopBorder>
            <TopButtonDiv>
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
            </TopButtonDiv>
        </TopBorder>
        <MainFormBorder isLeft={isLoginMode} isVisible={true} onSubmit={submitHandler}
                        buttonValue={isLoginMode ?'Login':'Sign Up'}>
            <InputItem
                type='text'
                id='username'
                placeholder='Username'
                value={username}
                onChange={(input) => {
                    setUsername(input);
                    if(username.length<3){
                        updateStatus({status:'error',message:'username is too short'});
                    }else{
                        updateStatus({status:'',message:''});
                    }

                }}
            />
            <InputItem
                type='password'
                id='password'
                placeholder='Password'
                value={password}
                onChange={(input) => {
                    setPassword(input);
                    if(password.length<7){
                        updateStatus({status:'error',message:'password is too short'});
                    }else{
                        updateStatus({status:'',message:''});
                    }
                }}
            />
        </MainFormBorder>
    </ContentCard>
};

export default LoginForm;