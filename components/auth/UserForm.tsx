import {FC, FormEvent, useState} from 'react';
import classes from "./LoginForm.module.css";
import {signout} from "next-auth/client";
import InputItem from "./InputItem";
import FetchStatus from "../ui/card/FetchStatus";
import TopButton from "../ui/card/TopButton";
import ContentCard from "../ui/card/ContentCard";
import TopBorder from "../ui/card/TopBorder";
import MainBorder from "../ui/card/MainBorder";
import ActionBorder from "../ui/card/ActionBorder";
import useJournal from "../../hooks/useJournal";

const changeUserPassword = async (oldPassword: string, newPassword: string) => {
    const response = await fetch('/api/user/change-password', {
        method: 'PATCH',
        body: JSON.stringify({oldPassword, newPassword}),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data: { message: string } = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Something went wrong!');
    }

    return data;
};

const UserForm: FC = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const{updateStatus,username} = useJournal();

    const changePasswordHandler = async (event:FormEvent) => {
        event.preventDefault();

        try {
            updateStatus({status: 'pending', message: 'Changing...'});
            await changeUserPassword(oldPassword, newPassword);
            setOldPassword('');
            setNewPassword('');
            updateStatus({status: 'success', message: 'Changes are complete'});
        } catch (error) {
            if (error instanceof Error) {
                updateStatus({status: 'error', message: error.message});
            }
        }
    };

    return <>
        <ContentCard>
            <MainBorder isLeft={false} isVisible={true}>
                Hello, {username} !
            </MainBorder>
        </ContentCard>
        <ContentCard>
        <TopBorder>
            <div>
                <TopButton
                    isActive={true}
                >CHANGE PASSWORD
                </TopButton>
                <TopButton
                    isActive={false}
                    onClick={() => signout()}>
                    Sign Out
                </TopButton>
            </div>
            <FetchStatus/>
        </TopBorder>
        <form onSubmit={changePasswordHandler}>
            <MainBorder isLeft={true} isVisible={true}>
                <div className={classes.loginFormInputItem}>
                    <InputItem
                        type='password'
                        id='oldPassword'
                        placeholder='Old Password'
                        value={oldPassword}
                        onChange={(input) => setOldPassword(input)}
                    />
                    <InputItem
                        type='password'
                        id='newPassword'
                        placeholder='New Password'
                        value={newPassword}
                        onChange={(input) => setNewPassword(input)}
                    />
                </div>
                <ActionBorder>
                    <button className={classes.icon}>
                        Change
                    </button>
                </ActionBorder>
            </MainBorder>
        </form>
    </ContentCard></>
};

export default UserForm;