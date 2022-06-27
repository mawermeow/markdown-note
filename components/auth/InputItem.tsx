import {FC, ChangeEvent } from 'react';
import classes from "./InputItem.module.css";
import {RiLock2Line,RiUserLine} from "react-icons/ri";

type InputItemProps = {
    type:string,
    id:string,
    placeholder:string,
    value:string,
    onChange:(input:string)=>void
};

const InputItem:FC<InputItemProps>=(props)=>{
    const {type, id, placeholder, value, onChange} = props;

    let icon;

    if(placeholder.includes('Password')){
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
                       value={value}
                       onChange={changeInputHandler}/>
                <label htmlFor={id}>
                    {icon&&icon}
                    <span>{placeholder}</span>
                </label>
            </div>
};

export default InputItem;