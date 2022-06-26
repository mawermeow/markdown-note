import {FC, ReactNode} from 'react';
import classes from "./MainBorder.module.css";

type MainBorderProps = {
    children?: ReactNode,
    isVisible:boolean,
    isLeft:boolean,
    isEditor?:boolean
}

const MainBorder:FC<MainBorderProps> = (props) =>{
    const {isLeft, children, isVisible, isEditor} = props;
    return <div className={`${classes.mainBorder} 
    ${isLeft?classes.isLeft:''} ${isVisible?'':classes.isNotVisible} ${isEditor?classes.isEditor:''}`}>
        {children}
    </div>
};

export default MainBorder;