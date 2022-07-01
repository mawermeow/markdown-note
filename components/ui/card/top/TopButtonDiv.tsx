import {FC, ReactNode} from 'react';
import classes from "./TopButtonDiv.module.css";

type TopButtonDivProps = {children?: ReactNode}

const TopButtonDiv:FC<TopButtonDivProps> = ({children}) =>{
    return <div className={classes.topButtonDiv}>
        {children}
    </div>
};

export default TopButtonDiv;