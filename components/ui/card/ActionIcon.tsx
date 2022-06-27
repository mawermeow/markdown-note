import React, {FC, ReactNode} from 'react';
import classes from "./ActionIcon.module.css";

type ActionIconProps = {
    children?: ReactNode,
    onClick?: () => void
}

const ActionIcon:FC<ActionIconProps> = (props) =>{
    const {children, onClick} = props;

    return <div className={classes.actionIcon} onClick={onClick}>
        {children}
    </div>
};

export default ActionIcon;