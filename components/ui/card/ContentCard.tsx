import {FC, ReactNode} from 'react';
import classes from "./ContentCard.module.css";

type ContentCardProps = {children?: ReactNode}

const ContentCard:FC<ContentCardProps> = (props) =>{
    return <div className={classes.contentCard}>
        {props.children}
    </div>
};

export default ContentCard;