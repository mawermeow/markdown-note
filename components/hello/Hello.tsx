import {FC} from 'react';
import classes from "./Hello.module.css";
import Directions from "../../pages/directions";

const Hello: FC = () => {

    return <>
        <div className={classes.container}>
            <div className={classes.header}>
                <img src="./images/basic/header.jpeg"
                       alt='header'
                       width={1100}
                       height={660}
                      className={classes.background}/>
                <div className={classes.floatAnimation}>
                    <h1>雪球筆記</h1>
                </div>
            </div>
            <section>
                <Directions/>
            </section>

        </div>
    </>
};

export default Hello;