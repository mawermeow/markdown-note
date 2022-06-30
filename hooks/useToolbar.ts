import {useContext} from "react";
import JournalContext from "../store/JournalContext";

const useToolbar=()=>{
    const {userToolbar, updateStatus,
        isToolbarSetMode, toggleToolbarSetting} = useContext(JournalContext);

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
        toggleToolbarSetting();
        if(isToolbarSetMode){
            await setToolbars()
        }
    };

    return {userToolbar, isToolbarSetMode, saveToolbarSetting, setToolbars};
};

export default useToolbar;