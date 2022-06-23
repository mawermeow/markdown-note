import {FC} from 'react';
import classes from "./LoadingCalendar.module.css";

const LoadingCalendar:FC = () =>{
    return <div className={classes.container}>
        <div className={classes.baseSchedule}>
            <div className={classes.headerCalendar}>
                <div className={classes.ironCalendar}/>
            </div>
            <div className={`${classes.leaf} ${classes.leafEffect}`}/>
            <div className={classes.leaf}/>
        </div>
    </div>
};

export default LoadingCalendar;