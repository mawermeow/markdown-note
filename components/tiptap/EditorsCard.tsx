import {FC, useState} from 'react';
import TopButton from "../ui/card/top/TopButton";
import TopBorder from "../ui/card/top/TopBorder";
import MainBorder from "../ui/card/MainBorder";
import ContentCard from "../ui/card/ContentCard";
import FetchStatus from "../ui/card/top/FetchStatus";
import NoteTitleForm from "../form/NoteTitleForm";
import {JournalData} from "../../types/Journal";
import Editor from "./Editor";
import NoteDeleteForm from "../form/NoteDeleteForm";


type LogProps = { title: string, content: string | {} };
type MarkdownCardProps = { contents: LogProps[] };


const EditorsCard: FC<MarkdownCardProps> = ({contents}) => {
    const [isLeftLog, setIsLeftLog] = useState(true);
    const [tag, setTag] = useState('Daily');

    const [isNoteFormVisible, setIsNoteFormVisible] = useState(false);
    let wantEditNoteInit:JournalData|undefined;
    const [wantEditNote,setWantEditNote] = useState(wantEditNoteInit);


    let firstButton = true;

    const topButtonList = contents.map(content => {
        const value = content.title;
        let onClickHandler = () => {
            if(tag === value){
                setWantEditNote(content);
                setIsNoteFormVisible(prev => !prev);
            }
            setTag(value);
            setWantEditNote(content);
            setIsLeftLog(false);
        };
        if(firstButton){
            onClickHandler = () => {
                if(tag === value){
                    setWantEditNote(content);
                    setIsNoteFormVisible(prev => !prev);
                }
                setTag(value);
                setWantEditNote(content);
                setIsLeftLog(true);
            };
        }

        firstButton = false;

        return <TopButton
            key={value}
            isActive={tag === value}
            onClick={onClickHandler}
        >{value}</TopButton>
    });

    const editorList = contents.map(content => {
        return <MainBorder
            isLeft={isLeftLog}
            key={content.title}
            isEditor={true}
            isVisible={tag === content.title}>

            <Editor
                key={content.title}
                title={content.title}
                content={content.content}
            />
        </MainBorder>
    });

    return <ContentCard>
        <NoteTitleForm isVisible={isNoteFormVisible} journalData={wantEditNote}
                       onClose={(newTitleInput)=> {
                           setTag(newTitleInput);
                           setIsNoteFormVisible(false)
                       }} />
        <TopBorder>
            <div>
                {topButtonList}
                <TopButton isActive={false} onClick={()=> {
                    if(wantEditNote && isNoteFormVisible){
                        setWantEditNote(undefined);
                    }else{
                        setWantEditNote(undefined);
                        setIsNoteFormVisible(prev => !prev);
                    }
                }
                }>+</TopButton>
            </div>
            <FetchStatus/>
        </TopBorder>
        {editorList}
        <NoteDeleteForm/>
    </ContentCard>
}

export default EditorsCard;