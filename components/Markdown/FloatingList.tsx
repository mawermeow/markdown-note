import {FC} from 'react';
import {FloatingMenu} from "@tiptap/react";
import {Editor} from "@tiptap/react/dist/packages/react/src/Editor";
import classes from "./FloatingList.module.css";

type Props = {editor:Editor}

const FloatingList:FC<Props> = ({editor}) =>{
    
    if(!editor){return <span>Loading</span>}

    return <>
        <FloatingMenu className={classes.floatingMenu} tippyOptions={{duration: 100}} editor={editor} pluginKey="FloatingOne">
            <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={editor.isActive('bulletList') ? classes.isActive : ''}
            >
                事件
            </button>
            <button
                onClick={() => editor.chain().focus().toggleTaskList().run()}
                className={editor.isActive('heading', {level: 2}) ? classes.isActive : ''}
            >
                任務
            </button>
            <button
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={editor.isActive('heading', {level: 1}) ? classes.isActive : ''}
            >
                註解
            </button>
        </FloatingMenu>
    </>
};

export default FloatingList;