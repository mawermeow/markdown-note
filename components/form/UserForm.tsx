import {FC, FormEvent, useContext, useState} from 'react';
import {signout} from "next-auth/client";
import InputItem from "../ui/form/InputItem";
import FetchStatus from "../ui/card/top/FetchStatus";
import TopButton from "../ui/card/top/TopButton";
import ContentCard from "../ui/card/ContentCard";
import TopBorder from "../ui/card/top/TopBorder";
import MainBorder from "../ui/card/MainBorder";
import MainFormBorder from "../ui/form/MainFormBorder";
import JournalContext from "../../store/JournalContext";
import TopButtonDiv from "../ui/card/top/TopButtonDiv";

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
    const {username,updateStatus} = useContext(JournalContext);

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
                Hello, {username}
            </MainBorder>
        </ContentCard>
        <ContentCard>
        <TopBorder>
            <FetchStatus/>
            <TopButtonDiv>
                <TopButton
                    isActive={true}
                >CHANGE PASSWORD
                </TopButton>
                <TopButton
                    isActive={false}
                    onClick={() => {
                        signout();
                        localStorage.clear();
                    }}>
                    Sign Out
                </TopButton>
            </TopButtonDiv>
        </TopBorder>
            <MainFormBorder isLeft={true} isVisible={true} onSubmit={changePasswordHandler}
                            buttonValue='Change'
            >
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
            </MainFormBorder>
    </ContentCard></>
};

export default UserForm;