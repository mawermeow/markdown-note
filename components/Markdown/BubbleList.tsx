import {FC} from 'react';
import {BubbleMenu} from "@tiptap/react";
import {Editor} from "@tiptap/react/dist/packages/react/src/Editor";

type Props = {editor:Editor}
const BubbleList:FC<Props> = ({editor}) =>{

    if(!editor){return <span>Loading...</span>}

    return <>
        <BubbleMenu className="bubble-menu" tippyOptions={{ duration: 100 }} editor={editor} pluginKey="BubbleOne">
            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={editor.isActive('bold') ? 'is-active' : ''}
            >
                Bold
            </button>
            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={editor.isActive('italic') ? 'is-active' : ''}
            >
                Italic
            </button>
            <button
                onClick={() => editor.chain().focus().toggleStrike().run()}
                className={editor.isActive('strike') ? 'is-active' : ''}
            >
                Strike
            </button>
        </BubbleMenu>
    </>
};

export default BubbleList;