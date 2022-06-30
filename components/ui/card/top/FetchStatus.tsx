import {FC, useContext, useState} from 'react';
import classes from "./FetchStatus.module.css";
import JournalContext from "../../../../store/JournalContext";



const FetchStatus:FC = () =>{
    const {journalStatus, showStatusMessage,toggleShowStatusMessage} = useContext(JournalContext);

    return <>
        <span onClick={()=>toggleShowStatusMessage()} className={
            `${classes.editorStatus} ${
                journalStatus.status==='pending'?classes.editorStatusPending
                    :journalStatus.status==='success'?classes.editorStatusSuccess
                        :journalStatus.status==='error'?classes.editorStatusError
                            :''}`}>
                {showStatusMessage && journalStatus.message}</span>
    </>
};

export default FetchStatus;