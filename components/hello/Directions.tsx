import {FC, ReactNode, useState} from 'react';
import TopBorder from "../ui/card/top/TopBorder";
import TopButton from "../ui/card/top/TopButton";
import MainBorder from "../ui/card/MainBorder";
import Editor from "../tiptap/Editor";
import ContentCard from "../ui/card/ContentCard";
import ToolbarSelectForm from "../form/ToolbarSelectForm";
import NoteDeleteForm from "../form/NoteDeleteForm";
import shortcutFile from "./shortcut.json";
import directionsFile from "./directions.json";

const Directions:FC = () =>{
    const [showShortcut,setShowShortcut] = useState(false);

    return <ContentCard>
        <TopBorder>
            <div>
                <TopButton onClick={()=>setShowShortcut(false)}
                           isActive={!showShortcut}>簡介</TopButton>
                <TopButton onClick={()=>setShowShortcut(true)}
                           isActive={showShortcut}>功能列＆快捷鍵</TopButton>
            </div>
        </TopBorder>
        <MainBorder isLeft={true} isVisible={!showShortcut} isEditor={true}>
            <Editor content={directionsFile} title='' notSave={true}/>
        </MainBorder>
        <MainBorder isLeft={false} isVisible={showShortcut} isEditor={true}>
            <Editor content={shortcutFile} title='' notSave={true}/>
        </MainBorder>
        <NoteDeleteForm/>
        <ToolbarSelectForm/>
    </ContentCard>
};

export default Directions;