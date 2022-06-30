import React, {FC, ReactNode, useEffect, useState} from 'react';
import classes from "./ActionIcon.module.css";
import useToolbar from "../../../hooks/useToolbar";

type ActionIconProps = {
    children?: ReactNode,
    onClick?: () => void,
    value?:JSX.Element,
    canDisabled?:string,
}

const ActionIcon:FC<ActionIconProps> = (props) =>{
    const {children, onClick, value, canDisabled} = props;
    const [isUsed, setIsUsed] = useState(false);
    const {userToolbar} = useToolbar();

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