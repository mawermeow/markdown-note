import {useContext, useEffect, useState} from "react";
import JournalContext from "../store/JournalContext";
import {JournalData} from "../types/Journal";
import {getSession} from "next-auth/client";


const useJournal=()=>{
    const {journals, updateJournals, journalStatus, updateStatus,username} = useContext(JournalContext);

    const getJournals = async ()=>{
        updateStatus({status:'pending',message:'Getting notes...'});
        const res = await fetch('/api/user/get-journals');
        const data = await res.json();
        if(!res.ok){
            updateStatus({status:'error',message:data.message});
            return;
        }
        updateJournals(data.journals, data.username);

        updateStatus({status:'success',message:'Take notes successfully'});
    };

    useEffect(()=>{
        getSession().then(session=>{
            if(session){
                if(!journals){
                    getJournals();
                }
            }
        })
    },[]);

    const setJournals = async ({title,content}:JournalData)=>{
        if(journals){
            const newJournals = journals.map(journal=>{
                if(title===journal.title){
                    return {title,content};
                }
                return journal;
            })

            updateStatus({status:'pending',message:`Saving ${title}...`});
            const res = await fetch('/api/user/set-journals',{
                method: 'PATCH',
                body: JSON.stringify(newJournals),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await res.json();
            if(!res.ok){
                updateStatus({status:'error',message:data.message});
            }else{
                updateStatus({status:'success',message:`Save ${title} successfully!`});
            }

        }
    };



    return {journals, journalStatus,updateStatus, setJournals,username};
}

export default useJournal;