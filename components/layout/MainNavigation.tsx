import type {FC} from 'react';
import Link from "next/link";
import classes from "./MainNavigation.module.css";
import Logo from "./Logo";
import Icon from "../ui/Icon";
import {RiUserLine,RiDraftLine,RiMenuFill} from "react-icons/ri";
import {useSession} from "next-auth/client";

const MainNavigation:FC=()=>{
    const [session, loading] = useSession();


    return <header className={classes.header}>
        <Link href="/">
            <a>
                <Logo/>
            </a>
        </Link>

        <nav className={classes.nav}>
            <ul className={classes.navNormal}>
                <li>
                    <Link href="/auth"><a>
                        <RiUserLine/>
                    </a></Link>
                </li>
                {session && <li>
                    <Link href="/notes"><a>
                        <RiDraftLine/>
                    </a></Link></li>}
                <li>
                    <Link href="/directions"><a>
                        <Icon type='searchCircle'/>
                    </a></Link>
                </li>
            </ul>
            <ul className={classes.navSmall}>
                <li>
                    <a>
                        <RiMenuFill/>
                    </a>
                </li>
            </ul>
        </nav>



    </header>
};

export default MainNavigation;