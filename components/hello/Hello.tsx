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
                    <h1>Bullet Note</h1>
                </div>
            </div>
            <section>
                <Directions/>
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