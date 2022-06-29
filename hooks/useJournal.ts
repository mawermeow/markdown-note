import {useContext, useEffect, useState} from "react";
import JournalContext from "../store/JournalContext";
import {JournalData} from "../types/Journal";
import {getSession} from "next-auth/client";


const useJournal=()=>{
    const {journals, renderJournals, journalStatus, updateStatus, renderUsername,
        renderUserToolbar, deleteHolder, updateDeleteHolder} = useContext(JournalContext);

    const getUserData = async ()=>{
        updateStatus({status:'pending',message:'Getting notes...'});
        const res = await fetch('/api/user/get-journals');
        const data = await res.json();

        if(!res.ok){
            updateStatus({status:'error',message:data.message});
            return;
        }

        renderJournals(data.journals);
        renderUsername(data.username);
        renderUserToolbar(data.toolbars);

        updateStatus({status:'success',message:'Take notes successfully'});
    };

    useEffect(()=>{
        getSession().then(session=>{
            if (session && !journals) {
                getUserData();
            }
        })
    },[]);

    const fetchSetJournals=async (newJournals:JournalData[],title:string, action:string[])=>{
        updateStatus({status:'pending',message:`${action[0]} ${title}...`});
        const res = await fetch('/api/user/set-journals',{
            method: 'PATCH',
            body: JSON.stringify({newJournals}),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await res.json();
        if(!res.ok){
            updateStatus({status:'error',message:data.message});
        }else{
            renderJournals(newJournals);
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
            // console.log('Deleted, now: ',newJournals);
            await fetchSetJournals(newJournals, deleteHolder, ['Deleting', 'Deleted']);
            updateDeleteHolder('');
        }
    };

    return {journals, journalStatus,updateStatus, addNewNoteToDB,
        updateContentToDB, delNoteToDB, updateTitleToDB, deleteHolder, updateDeleteHolder};
}

export default useJournal;