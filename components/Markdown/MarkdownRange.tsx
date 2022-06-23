import {FC, ReactNode} from 'react';
import classes from "./MarkdownRange.module.css";
import MarkdownEditor from "./MarkdownEditor";

const MarkdownRange:FC = () =>{
    return <div className={classes.range}>
        <MarkdownEditor/>
    </div>
};

export default MarkdownRange;