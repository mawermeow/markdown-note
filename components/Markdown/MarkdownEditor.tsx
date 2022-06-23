import React from 'react'
import {EditorContent, useEditor, FloatingMenu} from '@tiptap/react'
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
            TaskItem,
            Color,
            TextStyle,
            CustomBulletList, CustomBlockquote, CustomOrderedList, CustomTaskList,CustomCode,CustomCodeBlock
        ],
        content: content,
    })

    return (
        <>
            {editor && <BubbleList editor={editor}/>}
            {editor && <FloatingList editor={editor}/>}
            <EditorContent editor={editor}/>
        </>
    )
}

export default MarkdownEditor;