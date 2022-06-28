import React, {FC} from 'react';
import classes from "./ActionDivider.module.css";


const ActionDivider:FC<{onClick?:()=>void}> = ({onClick}) =>{
    return <div className={classes.actionDivider} onClick={onClick}/>
};

export default ActionDivider;