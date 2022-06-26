import {FC, ReactNode} from 'react';
import classes from "./ActionBorder.module.css";

type ActionBorderProps = {children?: ReactNode}

const ActionBorder:FC<ActionBorderProps> = (props) =>{
    return <div className={classes.actionBorder}>
        {props.children}
    </div>
};

export default ActionBorder;