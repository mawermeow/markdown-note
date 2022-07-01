import {FC, useContext, useState} from 'react';
import classes from "./FetchStatus.module.css";
import JournalContext from "../../../../store/JournalContext";



const FetchStatus:FC = () =>{
    const {journalStatus, showStatusMessage,toggleShowStatusMessage} = useContext(JournalContext);


    const cssMenuObj = {
        pending:classes.editorStatusPending,
        success:classes.editorStatusSuccess,
        error:classes.editorStatusError,
    };

    return <>
        <span onClick={()=>toggleShowStatusMessage()} className={
            `${classes.editorStatus} ${journalStatus ? 
                (journalStatus.status==='pending'?classes.editorStatusPending
                    :journalStatus.status==='success'?classes.editorStatusSuccess
                        :journalStatus.status==='error'?classes.editorStatusError
                            :''):''}`}>
                {journalStatus && showStatusMessage && journalStatus.message}</span>
    </>
};

export default FetchStatus;