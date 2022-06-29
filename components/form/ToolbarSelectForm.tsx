import {FC} from 'react';
import MainFormBorder from "../ui/form/MainFormBorder";
import useJournal from "../../hooks/useJournal";
import classes from "./NoteDleleteForm.module.css";

const ToolbarSelectForm:FC = () =>{
    const {delNoteToDB, deleteHolder} = useJournal();

    const submitHandler= async ()=>{
        await delNoteToDB();
    };

    return <div className={classes.NoteDeleteForm}>
        <MainFormBorder isVisible={deleteHolder!==''} isLeft={false} onSubmit={submitHandler}
                        buttonValue='DELETE'
        >
            <div className={classes.CheckMessage}>
                Do you really want to delete this note <span>{deleteHolder}</span>？
            </div>

        </MainFormBorder>
    </div>
};

export default ToolbarSelectForm;