import {FC} from 'react';
import classes from "./Loading.module.css";

const Loading: FC = () => {
    return<div className={classes.spinnerMargin}>
        <div className={classes.spinner}/>
    </div>


};

export default Loading;