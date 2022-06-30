import React from 'react';
import classes from "./Editor.module.css";
import ActionBorder from "../ui/card/ActionBorder";
import useCustomEditor from "../../hooks/useCustomEditor";
import {EditorContent} from "@tiptap/react";
import Toolbar from "./Toolbar";
import FloatingList from "./FloatingList";
import BubbleList from "./BubbleList";

type EditorProps = {
    title:string,
    content:string|{},
    isVisible?:boolean,
    isLeftLog?:boolean,
}

const Editor: React.FC<EditorProps> = ({title,content,isVisible=true,isLeftLog}) => {

    const editor = useCustomEditor(title,content);

    return (
        <>
            {editor && <BubbleList editor={editor}/>}
            {editor && <FloatingList editor={editor}/>}
            <EditorContent className={classes.editorContent} editor={editor}/>
            <ActionBorder>
                {editor && <Toolbar title={title} editor={editor}/>}
            </ActionBorder>
        </>
    )
}

export default Editor;