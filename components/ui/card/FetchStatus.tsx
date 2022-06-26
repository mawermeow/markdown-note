import {FC, useState} from 'react';
import classes from "./FetchStatus.module.css";

type FetchStatusProps = {
    fetchStatus:{status:string,message:string};
};

const FetchStatus:FC<FetchStatusProps> = ({fetchStatus}) =>{
    return <>
        {<span className={
            `${classes.editorStatus} ${
                fetchStatus.status==='pending'?classes.editorStatusPending
                    :fetchStatus.status==='success'?classes.editorStatusSuccess
                        :fetchStatus.status==='error'?classes.editorStatusError
                            :''}`}>
                {fetchStatus.message}</span>}
    </>
};

export default FetchStatus;