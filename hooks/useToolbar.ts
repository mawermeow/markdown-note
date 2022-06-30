import {useContext} from "react";
import JournalContext from "../store/JournalContext";
import {getTimestamp} from "../lib/localDate";

const useToolbar=()=>{
    const {userToolbar, updateStatus,
        isToolbarSetMode, toggleToolbarSetting} = useContext(JournalContext);

    const setToolbars = async ()=>{
        if(userToolbar){
            updateStatus({status:'pending',message:`Saving toolbar...`});

            const timestamp = getTimestamp();
            localStorage.setItem('journals',JSON.stringify(userToolbar));

            const res = await fetch('/api/user/set-journals',{
                method: 'PATCH',
                body: JSON.stringify({newToolbars:userToolbar,timestamp}),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await res.json();
            if(!res.ok){
                updateStatus({status:'error',message:'Saving error, saved in local.'});
            }else{
                localStorage.setItem('timestamp',JSON.stringify(timestamp));
                updateStatus({status:'success',message:'Saved toolbar successfully!'});
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