import {FC} from 'react';
import InputItem from "./InputItem";

import classes from "./LoginForm.module.css";

const LoginForm: FC = () => {

    const nameInputHandler = (input: string) => {
        console.log(input);
    };

    return <div className={classes.loginForm}>
        <div className={classes.loginFormHandler}>
            <InputItem
                type='email'
                id='email'
                placeholder='Email'
                onChange={nameInputHandler}
            />
            <InputItem
                type='password'
                id='password'
                placeholder='Password'
                onChange={nameInputHandler}
            />
        </div>
    </div>
};

export default LoginForm;