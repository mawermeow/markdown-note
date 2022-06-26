import {FC, useState} from 'react';
import classes from "./LoginForm.module.css";
import {signout} from "next-auth/client";
import InputItem from "./InputItem";
import FetchStatus from "../ui/card/FetchStatus";
import TopButton from "../ui/card/TopButton";
import ContentCard from "../ui/card/ContentCard";
import TopBorder from "../ui/card/TopBorder";
import MainBorder from "../ui/card/MainBorder";
import ActionBorder from "../ui/card/ActionBorder";

const changeUserPassword = async (oldPassword:string, newPassword:string)=>{
    const response = await fetch('/api/auth/change-password', {
        method: 'PATCH',
        body: JSON.stringify({ oldPassword, newPassword }),
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

const UserForm:FC = () =>{
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const [fetchStatus,setFetchStatus] = useState({status:'',message:''});

    const changePasswordHandler=async ()=>{
        console.log(oldPassword,newPassword)

        try{
            setFetchStatus({status:'pending',message:'Changing...'});
            await changeUserPassword(oldPassword,newPassword);
            setOldPassword('');
            setNewPassword('');
            setFetchStatus({status:'success',message:'Changes are complete'});
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
                    isActive={true}
                    >CHANGE PASSWORD
                </TopButton>
                <TopButton
                    isActive={false}
                    onClick={()=>signout()}>
                    Sign Out
                </TopButton>
            </div>
            <FetchStatus fetchStatus={fetchStatus}/>
        </TopBorder>
        <MainBorder isLeft={true} isVisible={true}>
            <div className={classes.loginFormInputItem}>
                <InputItem
                    type='password'
                    id='oldPassword'
                    placeholder='Old Password'
                    value={oldPassword}
                    onChange={(input) => {
                        setOldPassword(input);
                        setFetchStatus({status:'',message:''});
                    }}
                />
                <InputItem
                    type='password'
                    id='newPassword'
                    placeholder='New Password'
                    value={newPassword}
                    onChange={(input) => {
                        setNewPassword(input);
                        setFetchStatus({status:'',message:''});
                    }}
                />
            </div>
            <ActionBorder>
                <div className={classes.icon} onClick={changePasswordHandler}>
                    Change
                </div>
            </ActionBorder>
        </MainBorder>
    </ContentCard>
};

export default UserForm;