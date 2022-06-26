import {FC, FormEvent, useState} from 'react';
import {BubbleMenu} from "@tiptap/react";
import {Editor} from "@tiptap/react/dist/packages/react/src/Editor";
import classes from "./BubbleList.module.css";
import {RiDragMove2Fill, RiPencilLine} from "react-icons/ri";


type BubbleListProps = {editor:Editor};
type ColorButtonProps = {buttonText:string,newColor:string,originColor:string};
type SelectButtonProps = {buttonText:string,onClick:(selectedText:string)=>void};

const BubbleList:FC<BubbleListProps> = ({editor}) =>{
    const [color,setColor] = useState('#000000');

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
            editor.chain().focus().setColor('#b6b6b6').toggleStrike().run();
            console.log(selectedText);
    };


    if(!editor){return <span>Loading...</span>}

    return <>
        <BubbleMenu className={classes.bubbleMenu} tippyOptions={{ duration: 100 }} editor={editor} pluginKey="BubbleOne">
            <div className={classes.color}>
                <input
                    type="color"
                    onInput={event => {
                        const element = event.currentTarget as HTMLInputElement;
                        const value = element.value;
                        setColor(value);
                        return editor.chain().focus().setColor(value).run();
                    }}
                    value={color}
                />
            </div>
            <div
                className={`${classes.icon} ${editor.isActive('textStyle', {color: color}) ? classes.isActive : ''}`}
                onClick={() => {
                    if(editor.isActive('textStyle', { color: color})){
                        editor.chain().focus().setColor('#000000').run()
                    }else{
                        editor.chain().focus().setColor(color).run()
                    }
                }}
            >
                <RiPencilLine/>
            </div>

            <div
                className={classes.icon}
                onClick={()=>editor.chain().focus().selectParentNode().run()}
            >
                <RiDragMove2Fill/>
            </div>

            <button
                onClick={transferNotes}
                className={editor.isActive('strike') ? classes.isActive : ''}
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