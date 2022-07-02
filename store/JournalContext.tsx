import {createContext, Dispatch, FC, ReactNode, SetStateAction, useEffect, useState} from "react";
import {JournalData, JournalStatus, ToolBoxItem} from "../types/Journal";

interface JournalContextInterface {
    journals: JournalData[] | undefined,
    renderJournals: (newJournals: JournalData[]) => void,
    journalStatus: JournalStatus|undefined,
    updateStatus: (newStatus: JournalStatus|undefined) => void,
    showStatusMessage:boolean,
    toggleShowStatusMessage:()=>void,
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
    toolbarMenu:ToolBoxItem[],
    updateToolbarMenu:(newMenu:ToolBoxItem[])=>void,
    // toolbarMenu:JSX.Element[],
    // updateToolbarMenu:(newMenu:JSX.Element[])=>void,
}

const JournalContext = createContext<JournalContextInterface>({
    journals:undefined,
    renderJournals:(newJournals)=>{},
    journalStatus:undefined,
    updateStatus:(newStatus)=>{},
    showStatusMessage:true,
    toggleShowStatusMessage:()=>{},
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
    toolbarMenu:[],
    updateToolbarMenu:(newMenu:ToolBoxItem[])=>{},
});

type JournalContextProviderProps={
    children:ReactNode,
}

export const JournalContextProvider:FC<JournalContextProviderProps> = (props) => {

    const [journals, setJournals] = useState<JournalData[]|undefined>();
    const renderJournals=(newJournals:JournalData[])=>{
        setJournals(newJournals);
    };

    const [journalStatus, setJournalStatus] = useState<JournalStatus|undefined>();
    const updateStatus=(newStatus:JournalStatus|undefined)=>{
        setJournalStatus(newStatus);
    };

    const [showStatusMessage,setShowStatusMessage]=useState(true);
    const toggleShowStatusMessage=()=>{
        setShowStatusMessage(prev=>!prev);
    };

    const [username,setUsername]=useState('');
    const renderUsername = (journalOwner:string)=>{
        setUsername(journalOwner);
    }

    const [userToolbar,setUserToolbar] = useState(["","bold","italic","strike","alignLeft","alignCenter","divider1","undo"]);
    const renderUserToolbar=(newToolbar:string[])=>{
        setUserToolbar(newToolbar);
    }
    const toggleTool=(toolName: string)=>{
        if(userToolbar.includes(toolName)){
            setUserToolbar(userToolbar.filter(tool=>tool!=toolName));
        }else{
            setUserToolbar(prev=>[...prev, toolName]);
        }
    };

    const [isToolbarSetMode,setIsToolbarSetMode] = useState(false);
    const toggleToolbarSetting=()=>{
        setIsToolbarSetMode(prev=>!prev);
    };

    const [toolbarMenu, setToolbarMenu] = useState<ToolBoxItem[]>([]);
    const updateToolbarMenu=(newMenu:ToolBoxItem[])=>{
        setToolbarMenu(newMenu);
    };

    const [transText,setTransText] = useState('');
    const updateTransText=(newTransText:string)=>{
        setTransText(newTransText);
    };

    const [deleteHolder, setDeleteHolder] =useState('');
    const updateDeleteHolder=(deleteTitle:string)=>{
        setDeleteHolder(deleteTitle);
    };

    useEffect(() => {
        if (journalStatus && (journalStatus.status === 'success' || journalStatus.status === 'error')) {
            const timer = setTimeout(() => {
                setJournalStatus({status:'',message:''});
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
        showStatusMessage,
        toggleShowStatusMessage,
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
        toolbarMenu,
        updateToolbarMenu,
    };

    return <JournalContext.Provider value={context}>
        {props.children}
    </JournalContext.Provider>
}

export default JournalContext;