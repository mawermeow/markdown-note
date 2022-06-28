import {createContext, FC, ReactNode, useEffect, useState} from "react";
import {JournalData, JournalStatus} from "../types/Journal";

interface JournalContextInterface {
    journals: JournalData[] | undefined,
    journalStatus: JournalStatus,
    updateJournals: (newJournals: JournalData[]) => void,
    updateStatus: (newStatus: JournalStatus) => void,
    username: string,
    renderUsername: (journalOwner: string) => void,
    userToolbar: string[],
    toggleTool: (newTool: string) => void,
    isToolbarSetMode: boolean,
    toggleToolbarSetting: () => void,
    renderUserToolbar:(newToolbar:string[])=>void,
}

const JournalContext = createContext<JournalContextInterface>({
    journals:undefined,
    updateJournals:(newJournals)=>{},
    journalStatus:{status:'',message:''},
    updateStatus:(newStatus)=>{},
    username:'',
    renderUsername:(journalOwner)=>{},
    userToolbar:[],
    toggleTool:(newTool)=>{},
    isToolbarSetMode:false,
    toggleToolbarSetting:()=>{},
    renderUserToolbar:()=>{},
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
    const [userToolbar,setUserToolbar] = useState(['', 'bold', 'italic', 'strike', 'clear', 'divider1', 'orderedList', 'bulletList', 'taskList', 'blockQuote', 'divider2', 'horizon', 'link', 'divider3']);
    const [isToolbarSetMode,setIsToolbarSetMode] = useState(false);

    const renderUserToolbar=(newToolbar:string[])=>{
        setUserToolbar(newToolbar);
    }

    const toggleToolbarSetting=()=>{
        setIsToolbarSetMode(prev=>!prev);
    };

    const toggleTool=(toolName: string)=>{
        if(userToolbar.includes(toolName)){
            setUserToolbar(userToolbar.filter(tool=>tool!=toolName));
        }else{
            setUserToolbar(prev=>[...prev, toolName]);
        }
    };

    const updateUsername = (journalOwner:string)=>{
        setUsername(journalOwner);
    }

    const updateJournals=(newJournals:JournalData[])=>{
        setJournals(newJournals);
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
        updateJournals,
        journalStatus,
        updateStatus,
        username,
        renderUsername: updateUsername,
        userToolbar,
        toggleTool,
        isToolbarSetMode,
        toggleToolbarSetting,
        renderUserToolbar,
    };

    return <JournalContext.Provider value={context}>
        {props.children}
    </JournalContext.Provider>
}

export default JournalContext;