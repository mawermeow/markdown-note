import {FC, useContext, useState} from 'react';
import classes from "./FetchStatus.module.css";
import JournalContext from "../../../../store/JournalContext";



const FetchStatus:FC = () =>{
    const {journalStatus} = useContext(JournalContext);

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