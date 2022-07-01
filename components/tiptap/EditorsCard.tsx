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
import ToolbarSelectForm from "../form/ToolbarSelectForm";
import {useRouter} from "next/router";
import TopButtonDiv from "../ui/card/top/TopButtonDiv";


type LogProps = { title: string, content: string | {} };
type MarkdownCardProps = {
    contents: LogProps[],
    readTag?:string,
};

const EditorsCard: FC<MarkdownCardProps> = (props) => {
    const {contents, readTag} = props;
    const tagList = contents.map(content=> content.title);
    const [tag, setTag] = useState(readTag||tagList[0]);
    const router = useRouter();

    const [titleFormContent,setTitleFormContent] = useState<JournalData|undefined>();
    const [titleFormVisible, setTitleFormVisible] = useState(false);


    const topButtonList = contents.map(content => {
        const value = content.title;

        let onClickHandler = () => {
            if(tag === value){
                setTitleFormContent(content);
                setTitleFormVisible(prev => !prev);
            }
            setTag(value);
            setTitleFormContent(content);
            router.replace(`/notes/${value}`);
        };

        return <TopButton
            key={value}
            isActive={tag === value}
            onClick={onClickHandler}
        >{value}</TopButton>
    });

    const editorList = contents.map(content => {
        return <MainBorder
            key={content.title}
            isLeft={tag===tagList[0]}
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
        <NoteTitleForm isVisible={titleFormVisible} journalData={titleFormContent}
                       onClose={(newTitleInput)=> {
                           setTag(newTitleInput);
                           setTitleFormVisible(false)
                       }} />
        <TopBorder>
            <TopButtonDiv>
                {topButtonList}
                <TopButton isActive={false} onClick={()=> {
                    if(titleFormContent && titleFormVisible){
                        setTitleFormContent(undefined);
                    }else{
                        setTitleFormContent(undefined);
                        setTitleFormVisible(prev => !prev);
                    }
                }
                }>+</TopButton>
            </TopButtonDiv>
            <FetchStatus/>
        </TopBorder>
        {editorList}
        <NoteDeleteForm/>
        <ToolbarSelectForm/>
    </ContentCard>
}

export default EditorsCard;