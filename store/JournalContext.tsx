import {createContext, Dispatch, FC, ReactNode, SetStateAction, useEffect, useState} from "react";
import {JournalData, JournalStatus} from "../types/Journal";

interface JournalContextInterface {
    journals: JournalData[] | undefined,
    renderJournals: (newJournals: JournalData[]) => void,
    journalStatus: JournalStatus,
    updateStatus: (newStatus: JournalStatus) => void,
    username: string,
    renderUsername: (journalOwner: string) => void,
    userToolbar: string[],
    renderUserToolbar:(newToolbar:string[])=>void,
    toggleTool: (newTool: string) => void,
    isToolbarSetMode: boolean,
    toggleToolbarSetting: () => void,
    transText:string,
    updateTransText:(newTransText:string)=>void,
    deleteHolder:string,
    updateDeleteHolder:(deleteTitle:string)=>void,
}

const JournalContext = createContext<JournalContextInterface>({
    journals:undefined,
    renderJournals:(newJournals)=>{},
    journalStatus:{status:'',message:''},
    updateStatus:(newStatus)=>{},
    username:'',
    renderUsername:(journalOwner)=>{},
    userToolbar:[],
    renderUserToolbar:()=>{},
    isToolbarSetMode:false,
    toggleToolbarSetting:()=>{},
    toggleTool:(newTool)=>{},
    transText:'',
    updateTransText:(newTransText:string)=>{},
    deleteHolder:'',
    updateDeleteHolder:()=>{},
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

    const [transText,setTransText] = useState('');

    const [deleteHolder, setDeleteHolder] =useState('');

    const updateDeleteHolder=(deleteTitle:string)=>{
        setDeleteHolder(deleteTitle);
    };

    const updateTransText=(newTransText:string)=>{
        setTransText(newTransText);
    };

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

    const renderUsername = (journalOwner:string)=>{
        setUsername(journalOwner);
    }

    const renderJournals=(newJournals:JournalData[])=>{
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
        renderJournals,
        journalStatus,
        updateStatus,
        username,
        renderUsername,
        userToolbar,
        toggleTool,
        isToolbarSetMode,
        toggleToolbarSetting,
        renderUserToolbar,
        transText,
        updateTransText,
        deleteHolder,
        updateDeleteHolder,
    };

    return <JournalContext.Provider value={context}>
        {props.children}
    </JournalContext.Provider>
}

export default JournalContext;