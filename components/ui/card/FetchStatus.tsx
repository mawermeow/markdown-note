import {FC, useState} from 'react';
import classes from "./FetchStatus.module.css";
import useJournal from "../../../hooks/useJournal";



const FetchStatus:FC = () =>{
    const {journalStatus} = useJournal();

    return <>
        <span className={
            `${classes.editorStatus} ${
                journalStatus.status==='pending'?classes.editorStatusPending
                    :journalStatus.status==='success'?classes.editorStatusSuccess
                        :journalStatus.status==='error'?classes.editorStatusError
                            :''}`}>
                {journalStatus.message}</span>
    </>
};

export default FetchStatus;