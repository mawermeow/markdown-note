import {FC, FormEvent} from 'react';
import {BubbleMenu} from "@tiptap/react";
import {Editor} from "@tiptap/react/dist/packages/react/src/Editor";
import { Color } from '@tiptap/extension-color'

type BubbleListProps = {editor:Editor};
type ColorButtonProps = {colorName:string,newColor:string,originColor:string};

const BubbleList:FC<BubbleListProps> = ({editor}) =>{

    const ColorButton:FC<ColorButtonProps> = ({colorName, newColor, originColor})=>{
        return <button
            onClick={() => {
                if(editor.isActive('textStyle', { color: newColor})){
                    editor.chain().focus().setColor(originColor).run()
                }else{
                    editor.chain().focus().setColor(newColor).run()
                }
            }}
            className={editor.isActive('textStyle', { color: newColor }) ? 'is-active' : ''}
        >
            {colorName}
        </button>
    };

    if(!editor){return <span>Loading...</span>}

    return <>
        <BubbleMenu className="bubble-menu" tippyOptions={{ duration: 100 }} editor={editor} pluginKey="BubbleOne">
            <ColorButton
                colorName='紅'
                newColor='#F98181'
                originColor='#000000'
            />
            <ColorButton
                colorName='黃'
                newColor='#FAF594'
                originColor='#000000'
            />
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