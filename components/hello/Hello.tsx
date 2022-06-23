import {FC} from 'react';
import classes from "./Hello.module.css";

const Hello: FC = () => {
    return <>
        <div className={classes.container}>
            <div className={classes.header}>
                <img src="https://burst.shopifycdn.com/photos/two-customized-cars-rolling-through-a-city-street.jpg"
                      className={classes.background}/>
                <div className={classes.floatAnimation}>
                    <h1>CSS Parallax</h1>
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