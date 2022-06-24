import type {FC} from 'react';
import Link from "next/link";
import classes from "./MainNavigation.module.css";
import Logo from "./Logo";
import Icon from "../ui/Icon";

const MainNavigation:FC=()=>{
    return <header className={classes.header}>
        <Link href="/">
            <a>
                <Logo/>
            </a>
        </Link>

        <nav className={classes.end}>
            <ul>
                <li><Link href="/works"><a className='button'>Login</a></Link></li>
                <li><Link href="/works"><a className='button'><Icon type='pencilAlt'/></a></Link></li>
            </ul>
        </nav>

    </header>
};

export default MainNavigation;