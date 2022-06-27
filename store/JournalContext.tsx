import {createContext, FC, ReactNode, useEffect, useState} from "react";
import {JournalData, JournalStatus} from "../types/Journal";

interface JournalContextInterface {
    journals:JournalData[]|undefined,
    journalStatus:JournalStatus,
    updateJournals: (newJournals:JournalData[],journalOwner:string) => void,
    updateStatus:(newStatus:JournalStatus)=>void,
    username:string,
}

const JournalContext = createContext<JournalContextInterface>({
    journals:undefined,
    journalStatus:{status:'',message:''},
    updateJournals:(newJournals,journalOwner)=>{},
    updateStatus:(newStatus)=>{},
    username:'',
});

type JournalContextProviderProps={
    children:ReactNode,
}

export const JournalContextProvider:FC<JournalContextProviderProps> = (props) => {
    let journalsInit:JournalData[]|undefined;
    const [journals, setJournals] = useState(journalsInit);
    const journalStatusInit = {status:'',message:''};
    const [journalStatus, setJournalStatus] = useState(journalStatusInit);
    const [username,setUsername]=useState('');

    const updateJournals=(newJournals:JournalData[],journalOwner:string)=>{
        setJournals(newJournals);
        setUsername(journalOwner);
    };

    const updateStatus=(newStatus:JournalStatus)=>{
        setJournalStatus(newStatus);
    };

    useEffect(() => {
        if (journalStatus.status === 'success' ||journalStatus.status === 'error') {
            const timer = setTimeout(() => {
                setJournalStatus(journalStatusInit);
            }, 3000)
            return () => {
                clearTimeout(timer);
            }
        }
    }, [updateStatus])

    const context:JournalContextInterface = {
        journals,
        journalStatus,
        updateJournals,
        updateStatus,
        username,
    };

    return <JournalContext.Provider value={context}>
        {props.children}
    </JournalContext.Provider>
}

export default JournalContext;