import {FC, FormEvent} from 'react';
import {BubbleMenu} from "@tiptap/react";
import {Editor} from "@tiptap/react/dist/packages/react/src/Editor";


type BubbleListProps = {editor:Editor};
type ColorButtonProps = {buttonText:string,newColor:string,originColor:string};
type SelectButtonProps = {buttonText:string,onClick:(selectedText:string)=>void};

const BubbleList:FC<BubbleListProps> = ({editor}) =>{

    const ColorButton:FC<ColorButtonProps> = ({buttonText, newColor, originColor})=>{
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
            {buttonText}
        </button>
    };

    const transferNotes=()=>{
            editor.chain().focus().selectParentNode().setColor('#ffa311').run()
            console.log(editor.getJSON())
            const html = editor.getHTML();
            let selectedText = '';
            if(html.includes('<span style="color: #ffa311">')){
                selectedText = html.split('<span style="color: #ffa311">')[1].split('</span>')[0]
            }
            editor.chain().focus().setColor('#000000').toggleStrike().run();
            console.log(selectedText);
    };


    if(!editor){return <span>Loading...</span>}

    return <>
        <BubbleMenu className="bubble-menu" tippyOptions={{ duration: 100 }} editor={editor} pluginKey="BubbleOne">
            <ColorButton
                buttonText='紅'
                newColor='#F98181'
                originColor='#000000'
            />
            <ColorButton
                buttonText='黃'
                newColor='#FAF594'
                originColor='#000000'
            />
            <button
                onClick={transferNotes}
                className={editor.isActive('strike') ? 'is-active' : ''}
            >
                轉移
            </button>
            {/*<button*/}
            {/*    onClick={() => editor.chain().focus().toggleStrike().run()}*/}
            {/*    className={editor.isActive('strike') ? 'is-active' : ''}*/}
            {/*>*/}
            {/*    Strike*/}
            {/*</button>*/}

        </BubbleMenu>
    </>
};

export default BubbleList;