import {useContext, useEffect, useState} from "react";
import JournalContext from "../store/JournalContext";
import {JournalData} from "../types/Journal";
import {getSession} from "next-auth/client";
import {getTimestamp} from "../lib/localDate";


const useJournal=()=>{
    const {journals, renderJournals, updateStatus,renderUsername,
        renderUserToolbar, deleteHolder, updateDeleteHolder} = useContext(JournalContext);

    const getUserData = async ()=>{
        updateStatus({status:'pending',message:'Getting notes...'});

        const localTimestamp = localStorage.getItem('timestamp');
        const localJournals = localStorage.getItem('journals');
        const localUsername = localStorage.getItem('username');
        const localToolbars = localStorage.getItem('toolbars');

        if(localTimestamp) {
            if (localJournals && localUsername && localToolbars) {
                renderJournals(JSON.parse(localJournals));
                renderUsername(JSON.parse(localUsername));
                renderUserToolbar(JSON.parse(localToolbars));
                updateStatus({status: 'success', message: 'Successfully get local notes'});
            }
        }

        const res = await fetch('/api/user/get-journals');
        const data = await res.json();

        if(!res.ok){
            updateStatus({status:'error',message:data.message});
            return;
        }

        if(localTimestamp && data.timestamp === JSON.parse(localTimestamp)){
            const timestamp = getTimestamp();

            const res = await fetch('/api/user/set-journals',{
                method: 'PATCH',
                body: JSON.stringify({newJournals:localJournals,timestamp}),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if(res.ok){
                updateStatus({status:'success',message:'Saved notes successfully'});
            }
        }else{
            renderJournals(data.journals);
            renderUsername(data.username);
            renderUserToolbar(data.toolbars);
            localStorage.setItem('journals',JSON.stringify(data.journals));
            localStorage.setItem('username',JSON.stringify(data.username));
            localStorage.setItem('toolbars',JSON.stringify(data.toolbars));
            localStorage.setItem('timestamp',JSON.stringify(localTimestamp));
            updateStatus({status:'success',message:'Take notes successfully'});
        }
    }

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

    const fetchSetJournals=async (newJournals:JournalData[],title:string, action:string[])=>{
        updateStatus({status:'pending',message:`${action[0]} ${title}...`});

        const timestamp = getTimestamp();
        localStorage.setItem('journals',JSON.stringify(newJournals));
        renderJournals(newJournals);

        const res = await fetch('/api/user/set-journals',{
            method: 'PATCH',
            body: JSON.stringify({newJournals,timestamp}),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        // const data = await res.json();

        if(!res.ok){
            updateStatus({status:'error',message:`${action[0]} error, ${title} saved locally`});
        }else{
            localStorage.setItem('timestamp',timestamp.toString());
            updateStatus({status:'success',message:`${action[1]} ${title} successfully!`});
        }
    };

    const updateContentToDB = async ({title,content}:JournalData)=>{
        if(journals){
            const newJournals = journals.map(journal=>{
                if(journal.title===title){
                    return {title,content};
                }
                return journal;
            });
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
            const newJournals = journals.filter(journal=>journal.title!==deleteHolder);
            await fetchSetJournals(newJournals, deleteHolder, ['Deleting', 'Deleted']);
            updateDeleteHolder('');
        }
    };

    return {journals, addNewNoteToDB, updateContentToDB, delNoteToDB, updateTitleToDB};
}

export default useJournal;