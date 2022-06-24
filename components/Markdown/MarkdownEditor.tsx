import React from 'react';
import {EditorContent, useEditor} from '@tiptap/react'
import Highlight from '@tiptap/extension-highlight'
import Typography from '@tiptap/extension-typography'
import StarterKit from '@tiptap/starter-kit'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import FloatingList from "./FloatingList";
import BubbleList from "./BubbleList";
import { Color } from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import {CustomBulletList, CustomBlockquote, CustomOrderedList, CustomTaskList, CustomCode,CustomCodeBlock} from "./ShortCut";
import classes from "./MarkdownEditor.module.css";

type MarkDownEditorProps = {
    content:string
}

const MarkdownEditor: React.FC<MarkDownEditorProps> = ({content}) => {

    const editor = useEditor({
        extensions: [
            StarterKit,
            Highlight,
            Typography,
            TaskList,
            TaskItem.configure({
                nested: true,
            }),
            Color,
            TextStyle,
            CustomBulletList, CustomBlockquote, CustomOrderedList, CustomTaskList,CustomCode,CustomCodeBlock
        ],
        content: content,
    })

    const saveEditor=()=>{
        const text = editor?.getJSON();
        console.log('儲存檔案到localhost',text);
    };

    let status = 'Connected';
    const statusCss = status==='Connecting' ? classes.editorStatusConnecting : classes.editorStatusConnected;

    return (
        <div className={classes.editor}>
            {editor && <BubbleList editor={editor}/>}
            {editor && <FloatingList editor={editor}/>}
            <EditorContent className={classes.editorContent} editor={editor}/>
            <div className={classes.editorFooter}>
                <div className={`${classes.editorStatus} ${statusCss}`}>
                </div>
                <div className={classes.editorName}>
                    <button onClick={saveEditor}>儲存</button>
                </div>
            </div>
        </div>
    )
}

export default MarkdownEditor;