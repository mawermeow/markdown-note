import {FC, FormEvent, useContext} from 'react';
import MainFormBorder from "../ui/form/MainFormBorder";
import useJournal from "../../hooks/useJournal";
import classes from "./NoteDeleteForm.module.css";
import JournalContext from "../../store/JournalContext";

const NoteDeleteForm:FC = () =>{
    const {delNoteToDB} = useJournal();
    const {deleteHolder} = useContext(JournalContext);

    const submitHandler= async (event:FormEvent)=>{
        event.preventDefault();
        await delNoteToDB();
    };

    return <div className={classes.noteDeleteForm}>
        <MainFormBorder isVisible={deleteHolder!==''} isLeft={false} onSubmit={submitHandler}
                        buttonValue='DELETE'
        >
            <div className={classes.checkMessage}>
                Do you really want to delete this note <span>{deleteHolder}</span>？
            </div>

        </MainFormBorder>
    </div>
};

export default NoteDeleteForm;