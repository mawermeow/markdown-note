import {FC, FormEvent, ReactNode} from 'react';
import classes from "./MainFormBorder.module.css";
import MainBorder from "../card/MainBorder";
import ActionBorder from "../card/ActionBorder";

type MainFormBorderProps = {
    children?: ReactNode,
    onSubmit:(event:FormEvent)=>void,
    isLeft:boolean,
    isVisible:boolean,
    buttonValue:string,
}

const MainFormBorder:FC<MainFormBorderProps> = (props) =>{
    const {children, onSubmit, buttonValue, isLeft, isVisible} = props;

    return <>
        <form onSubmit={onSubmit}>
            <MainBorder isLeft={isLeft} isVisible={isVisible}>
                <div className={classes.loginFormInputItem}>
                    {children}
                </div>
                <ActionBorder>
                    <button className={classes.icon}>
                        {buttonValue}
                    </button>
                </ActionBorder>
            </MainBorder>
        </form>
    </>
};

export default MainFormBorder;