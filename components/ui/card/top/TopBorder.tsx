import {FC, ReactNode} from 'react';
import classes from "./TopBorder.module.css";

type TopBorderProps = {children?: ReactNode}

const TopBorder:FC<TopBorderProps> = (props) =>{
    return <div className={classes.topBorder}>
        {props.children}
    </div>
};

export default TopBorder;