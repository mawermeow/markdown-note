import {FC, useState} from 'react';
import InputItem from "./InputItem";
import {RiLoginBoxLine} from "react-icons/ri";

import classes from "./LoginForm.module.css";


const LoginForm: FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);

    const signupHandler = () => {
    };

    const loginHandler = () => {
    };

    return <div className={classes.outRange}>

        <button
            className={isLogin ? classes.isActive : classes.notActive}
            onClick={()=>{setIsLogin(true)}}>
            Login
        </button>
        <button
            className={!isLogin ? classes.isActive : classes.notActive}
            onClick={()=>{setIsLogin(false)}}>
            Signup
        </button>


        <div className={`${classes.loginForm} ${isLogin?classes.isLeftForm:''}`} >
            <div className={classes.loginFormInputItem}>
                <InputItem
                    type='username'
                    id='username'
                    placeholder='Username'
                    onChange={(input) => setUsername(input)}
                />
                <InputItem
                    type='password'
                    id='password'
                    placeholder='Password'
                    onChange={(input) => setPassword(input)}
                />
            </div>
            <div className={classes.loginFormButtonRange}>
                {isLogin ?
                    <div className={classes.icon} onClick={loginHandler}>
                        Login
                    </div>
                    : <div className={classes.icon} onClick={signupHandler}>
                        Sign Up
                    </div>}
            </div>
        </div>
    </div>
};

export default LoginForm;