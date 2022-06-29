import {FC, ReactNode} from "react";
import classes from "./TopButton.module.css";

type CardButtonProps = {
    children:ReactNode;
    isActive:boolean,
    onClick?:()=>void
};

const TopButton:FC<CardButtonProps> = (props)=>{
    const {children, isActive, onClick} = props;

    return <button
        onClick={onClick}
        className={`${classes.topButton} ${isActive?classes.isActive:classes.notActive}`}>
        {children}
    </button>
};

export default TopButton;