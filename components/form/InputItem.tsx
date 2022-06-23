import {FC, ChangeEvent } from 'react';
import classes from "./InputItem.module.css";
import Icon from "../ui/Icon";

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
        icon = <Icon type='key'/>;
    }

    if(placeholder==='Email'){
        icon = <Icon type='mail'/>;
    }

    const changeInputHandler=(event: ChangeEvent<HTMLInputElement>):void=>{
        onChange(event.target.value);
    };

    return <div className={classes.inputItem}>
                <input type={type} id={id} placeholder={placeholder}
                       onChange={changeInputHandler}/>
                <label htmlFor={id}>{icon&&icon} {placeholder}</label>
            </div>
};

export default InputItem;