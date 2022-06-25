import {FC} from 'react';
import classes from "./Hello.module.css";
import Image from "next/image";

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
                    <h1>Moni Note</h1>
                </div>
            </div>
            <section>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hic asperiores, debitis ullam quibusdam ad
                    expedita cumque voluptatem similique excepturi suscipit harum aliquid temporibus totam labore saepe
                    dolor inventore itaque. Quae.</p>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hic asperiores, debitis ullam quibusdam ad
                    expedita cumque voluptatem similique excepturi suscipit harum aliquid temporibus totam labore saepe
                    dolor inventore itaque. Quae.</p>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hic asperiores, debitis ullam quibusdam ad
                    expedita cumque voluptatem similique excepturi suscipit harum aliquid temporibus totam labore saepe
                    dolor inventore itaque. Quae.</p>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hic asperiores, debitis ullam quibusdam ad
                    expedita cumque voluptatem similique excepturi suscipit harum aliquid temporibus totam labore saepe
                    dolor inventore itaque. Quae.</p>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hic asperiores, debitis ullam quibusdam ad
                    expedita cumque voluptatem similique excepturi suscipit harum aliquid temporibus totam labore saepe
                    dolor inventore itaque. Quae.</p>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hic asperiores, debitis ullam quibusdam ad
                    expedita cumque voluptatem similique excepturi suscipit harum aliquid temporibus totam labore saepe
                    dolor inventore itaque. Quae.</p>
            </section>

        </div>
    </>
};

export default Hello;