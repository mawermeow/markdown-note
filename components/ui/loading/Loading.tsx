import {FC} from 'react';
import classes from "./Loading.module.css";

const Loading: FC = () => {
    return <div className={classes.spinner}/>;
};

export default Loading;