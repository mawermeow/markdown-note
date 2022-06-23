import type {FC} from 'react';
import Link from "next/link";
import classes from "./MainNavigation.module.css";
import Logo from "./Logo";

const MainNavigation:FC=()=>{
    return <header className={classes.header}>
        <Link href="/">
            <a>
                <Logo/>
            </a>
        </Link>

        <nav className={classes.end}>
            <ul>
                <li><Link href="/works"><a className='button'>works</a></Link></li>
            </ul>
        </nav>

    </header>
};

export default MainNavigation;