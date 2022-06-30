import {FC, ReactNode} from 'react';
import classes from "./ActionBorder.module.css";
import {useInView} from "react-cool-inview";

type ActionBorderProps = {
    children?: ReactNode,
    notSticky?:boolean,
}

const ActionBorder:FC<ActionBorderProps> = (props) =>{
    const {children, notSticky} = props;

    const { observe, inView } = useInView({
        rootMargin: '0px 0px -1px 0px',
        threshold: [1],
    })

    return <div className={`${classes.actionBorder}
                ${notSticky? classes.notSticky : !inView?classes.sticky:''}`} ref={observe}>
        {children}
    </div>
};

export default ActionBorder;