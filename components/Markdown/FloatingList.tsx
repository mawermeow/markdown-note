import {FC} from 'react';
import {FloatingMenu} from "@tiptap/react";
import {Editor} from "@tiptap/react/dist/packages/react/src/Editor";

type Props = {editor:Editor}

const FloatingList:FC<Props> = ({editor}) =>{
    
    if(!editor){return <span>Loading</span>}

    return <>
        <FloatingMenu className="floating-menu" tippyOptions={{duration: 100}} editor={editor} pluginKey="FloatingOne">
            <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={editor.isActive('bulletList') ? 'is-active' : ''}
            >
                事件
            </button>
            <button
                onClick={() => editor.chain().focus().toggleTaskList().run()}
                className={editor.isActive('heading', {level: 2}) ? 'is-active' : ''}
            >
                任務
            </button>
            <button
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={editor.isActive('heading', {level: 1}) ? 'is-active' : ''}
            >
                註解
            </button>
        </FloatingMenu>
    </>
};

export default FloatingList;