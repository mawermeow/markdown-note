import {FC, FormEvent, useState} from 'react';
import MainFormBorder from "../ui/form/MainFormBorder";
import InputItem from "../ui/form/InputItem";
import useJournal from "../../hooks/useJournal";
import {JournalData} from "../../types/Journal";

type NoteTitleForm = {
    onClose:(newTitle:string)=>void,
    isVisible:boolean,
    journalData?:JournalData
}

const NoteTitleForm:FC<NoteTitleForm> = (props) =>{
    const {isVisible, onClose, journalData} = props;
    const [newTitleInput, setNewTitleInput]= useState('');
    const {updateTitleToDB, addNewNoteToDB} = useJournal();

    const placeholder = `${journalData? 'New Title':'New Note'}`

    const submitHandler= async (event:FormEvent)=>{
        event.preventDefault();
        onClose(newTitleInput);

        if(journalData){
            await updateTitleToDB(journalData.title,newTitleInput);
        }else{
            await addNewNoteToDB(newTitleInput);
        }

        setNewTitleInput('');
    };

    return <>
        <MainFormBorder isVisible={isVisible} isLeft={false} onSubmit={submitHandler}
                        buttonValue={journalData?`Change ${journalData.title}'s Title`:'Add Note'}
        >
            <InputItem type='text' onChange={(input)=>setNewTitleInput(input)}
                       value={newTitleInput} placeholder={placeholder} id='titleInput'/>
        </MainFormBorder>
    </>
};

export default NoteTitleForm;