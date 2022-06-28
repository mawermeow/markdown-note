import React, {FC, ReactNode, useEffect, useState} from 'react';
import classes from "./ActionIcon.module.css";
import useUserHabits from "../../../hooks/useUserHabits";

type ActionIconProps = {
    children?: ReactNode,
    onClick?: () => void,
    value?:JSX.Element,
    canDisabled?:string,
}

const ActionIcon:FC<ActionIconProps> = (props) =>{
    const {children, onClick, value, canDisabled} = props;
    const [isUsed, setIsUsed] = useState(false);
    const {userToolbar} = useUserHabits();

    useEffect(()=>{
        if(userToolbar && canDisabled){
            setIsUsed(userToolbar.some(p=>canDisabled===p));
        }
    },[userToolbar])

    return <div className={`${classes.actionIcon} ${isUsed?classes.used:''}`} onClick={onClick}>
        {value?value:children}
    </div>
};

export default ActionIcon;