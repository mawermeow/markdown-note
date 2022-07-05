import {useContext, useEffect} from "react";
import JournalContext from "../store/JournalContext";
import {JournalData} from "../types/Journal";
import {getSession} from "next-auth/client";
import {getTimestamp} from "../lib/localDate";

const useJournal= ()=>{
    const {journals, renderJournals, updateStatus,renderUsername,
        renderUserToolbar, deleteHolder, updateDeleteHolder} = useContext(JournalContext);

    const localStorageReplaceDB=async (localJournals:JournalData[])=>{
        const timestamp = getTimestamp();

        updateStatus({status:'pending',message:'Upload new note...'});
        const res = await fetch('/api/user/set-journals',{
            method: 'PATCH',
            body: JSON.stringify({newJournals:localJournals, timestamp}),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if(res.ok){
            setLocalStorage('timestamp', timestamp);
            updateStatus({status:'success',message:'New note uploaded'});
        }
    };

    const getLocalStorage=(key:string)=>{
        const localSrc = localStorage.getItem(key);
        return localSrc && JSON.parse(localSrc);
    };

    const setLocalStorage=(key:string, value:any)=>{
        localStorage.setItem(key,JSON.stringify(value));
    };

    const getLocalStorageData=()=>{
        const localJournals:JournalData[] = getLocalStorage('journals');
        const localToolbars:string[] = getLocalStorage('toolbars');
        const localTimestamp:number = getLocalStorage('timestamp');
        const localUsername:string = getLocalStorage('username');

        return {localJournals, localToolbars, localTimestamp, localUsername};
    }

    const renderLocalStorageData=()=>{
        const {localJournals, localToolbars, localTimestamp, localUsername} = getLocalStorageData();

        if(localJournals && localToolbars && localTimestamp && localUsername){
            updateStatus({status: 'pending', message: 'Loaded local notes...'});
            renderJournals(localJournals);
            renderUserToolbar(localToolbars);
            renderUsername(localUsername);
        }
    };


    const getUserData = async ()=>{
        const {localJournals, localTimestamp} = getLocalStorageData();

        updateStatus({status:'pending',message:'Getting notes...'});
        const res = await fetch('/api/user/get-journals');
        const data = await res.json();
        if(!res.ok){
            updateStatus({status: 'error', message: 'Can not connect to Database.'});
            renderLocalStorageData();
            return;
        }

        if(localTimestamp && localTimestamp === data.timestamp){
            renderLocalStorageData();
            await localStorageReplaceDB(localJournals);
            return;
        }

        renderJournals(data.journals);
        renderUsername(data.username);
        renderUserToolbar(data.toolbars);
        setLocalStorage('journals',data.journals);
        setLocalStorage('username',data.username);
        setLocalStorage('toolbars',data.toolbars);
        setLocalStorage('timestamp',data.timestamp);

        updateStatus({status:'success',message:'Take notes successfully'});
        return localJournals;
    };

    useEffect(()=>{
        getSession().then(session=>{
            if(!session){
                localStorage.clear();
            }
            if (session && !journals) {
                getUserData();
            }
        })
    },[]);

    const fetchSetJournals=async (
        newJournals:JournalData[],
        title:string,
        action:string[],
    )=>{
        updateStatus({status:'pending',message:`${action[0]} ${title}...`});

        setLocalStorage('journals', newJournals);
        renderJournals(newJournals);

        const timestamp = getTimestamp();

        const res = await fetch('/api/user/set-journals',{
            method: 'PATCH',
            body: JSON.stringify({newJournals,timestamp}),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if(!res.ok){
            updateStatus({status:'error',message:`${action[0]} error, ${title} saved locally`});
        }else{
            setLocalStorage('timestamp',timestamp.toString());
            updateStatus({status:'success',message:`${action[1]} ${title} successfully!`});
        }
    };

    const updateContentToDB = async ({title,content}:JournalData)=>{
        if(journals){
            let newJournals = [...journals, {title,content}];
            if(journals.some(journal=>journal.title===title)){
                newJournals = journals.map(journal=>{
                    if(journal.title===title){
                        return {title,content};
                    }
                    return journal;
                });
            }

            await fetchSetJournals(newJournals, title, ['Updating','Updated']);
        }
    };

    const updateTitleToDB = async (oldTitle:string, newTitle:string)=>{
        if(oldTitle.trim().length===0 || newTitle.trim().length===0){
            updateStatus({status:'error',message:'Please input valid title.'});
            return;
        }
        if(journals){
            const newJournals = journals.map(journal=>{
                if(journal.title===oldTitle){
                    return {title:newTitle,content:journal.content};
                }
                return journal;
            })
            await fetchSetJournals(newJournals, newTitle, ['Saving', 'Saved']);
        }
    };

    const addNewNoteToDB = async (newTitle:string)=>{
        if(newTitle.trim().length===0){
            updateStatus({status:'error',message:'Please input valid title.'});
            return;
        }
        if(journals){
            const newJournals = [...journals, {title:newTitle, content:{}}];
            await fetchSetJournals(newJournals, newTitle, ['Adding','Added']);
        }
    };

    const delNoteToDB = async ()=>{
        if(journals && deleteHolder){
            updateDeleteHolder('');
            const newJournals = journals.filter(journal=>journal.title!==deleteHolder);
            await fetchSetJournals(newJournals, deleteHolder, ['Deleting', 'Deleted']);
        }
    };

    return {journals, addNewNoteToDB, updateContentToDB, delNoteToDB, updateTitleToDB, getUserData};
}

export default useJournal;