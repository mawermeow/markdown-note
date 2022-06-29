import {useContext, useState} from "react";
import JournalContext from "../store/JournalContext";

const useUserHabits=()=>{
    const {username, userToolbar, toggleTool, updateStatus,
        isToolbarSetMode, toggleToolbarSetting, transText, updateTransText} = useContext(JournalContext);

    const setToolbars = async ()=>{
        if(userToolbar){
            updateStatus({status:'pending',message:`Saving toolbar...`});
            const res = await fetch('/api/user/set-journals',{
                method: 'PATCH',
                body: JSON.stringify({newToolbars:userToolbar}),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await res.json();
            if(!res.ok){
                updateStatus({status:'error',message:data.message});
            }else{
                updateStatus({status:'success',message:'Save toolbar successfully!'});
            }

        }
    };

    const saveToolbarSetting=async ()=>{
        if(isToolbarSetMode){
            await setToolbars()
        }
        toggleToolbarSetting();
    };



    return {username, userToolbar, toggleTool, isToolbarSetMode,
        saveToolbarSetting, setToolbars, transText,updateTransText};
};

export default useUserHabits;