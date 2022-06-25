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
import Toolbar from "./Toolbar";
import {Link} from "@tiptap/extension-link";

type MarkDownEditorProps = {
    content:string|{},isVisible?:boolean,isLeftLog?:boolean
}

const MarkdownEditor: React.FC<MarkDownEditorProps> = ({content,isVisible=true,isLeftLog}) => {

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
            Link,
            CustomBulletList, CustomBlockquote, CustomOrderedList, CustomTaskList,CustomCode,CustomCodeBlock
        ],
        content: content,
        onUpdate: ({ editor }) => {
            const json = editor.getJSON()
            // send the content to an API here
        },
    })

    const saveEditor=()=>{
        const text = editor?.getJSON();
        console.log(text);
    };

    let status = 'Connected';
    const statusCss = status==='Connecting' ? classes.editorStatusConnecting : classes.editorStatusConnected;

    return (
        <div className={isVisible?'':classes.isNotVisible}>
            <div className={`${classes.editor} ${isLeftLog ? classes.isLeftLog : ''}`}>
            {editor && <BubbleList editor={editor}/>}
            {editor && <FloatingList editor={editor}/>}
            <EditorContent className={classes.editorContent} editor={editor}/>
            <div className={classes.editorFooter}>
                <div className={`${classes.editorStatus} ${statusCss}`}/>

                {editor && <Toolbar editor={editor}/>}

                <div className={classes.editorName}>
                    <button onClick={saveEditor}>儲存</button>
                </div>
            </div>
            </div>
        </div>
    )
}

export default MarkdownEditor;