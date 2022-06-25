import {FC, ChangeEvent } from 'react';
import classes from "./InputItem.module.css";
import Icon from "../ui/Icon";
import {RiLock2Line,RiUserLine} from "react-icons/ri";

type InputItemProps = {
    type:string,
    id:string,
    placeholder:string,
    onChange:(input:string)=>void
};

const InputItem:FC<InputItemProps>=(props)=>{
    const {type, id, placeholder, onChange} = props;

    let icon;

    if(placeholder==='Password'){
        icon = <RiLock2Line/>;
    }

    if(placeholder==='Username'){
        icon = <RiUserLine/>;
    }

    const changeInputHandler=(event: ChangeEvent<HTMLInputElement>):void=>{
        onChange(event.target.value);
    };

    return <div className={classes.inputItem}>
                <input type={type} id={id} placeholder={placeholder}
                       onChange={changeInputHandler}/>
                <label htmlFor={id}>
                    {icon&&icon}
                    <span>{placeholder}</span>
                </label>
            </div>
};

export default InputItem;