import {FC, ReactNode} from 'react';
import classes from "./ActionBorder.module.css";
import {useInView} from "react-cool-inview";

type ActionBorderProps = {children?: ReactNode}

const ActionBorder:FC<ActionBorderProps> = (props) =>{

    const { observe, inView } = useInView({
        rootMargin: '0px 0px -1px 0px',
        threshold: [1],
    })

    return <div className={`${classes.actionBorder} ${!inView?classes.sticky:''}`} ref={observe}>
        {props.children}
    </div>
};

export default ActionBorder;