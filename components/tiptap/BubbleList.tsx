import {FC, useContext, useState} from 'react';
import {BubbleMenu} from "@tiptap/react";
import {Editor} from "@tiptap/react/dist/packages/react/src/Editor";
import classes from "./BubbleList.module.css";
import {RiAlignCenter, RiDragMove2Fill, RiPencilLine} from "react-icons/ri";
import {clickAlignHandler} from "../../lib/editorLib";
import JournalContext from "../../store/JournalContext";


type BubbleListProps = { editor: Editor };

const BubbleList: FC<BubbleListProps> = ({editor}) => {
        const {updateTransText} = useContext(JournalContext);

        const [color, setColor] = useState('#000000');

        const transferNotes = () => {
            editor.chain().focus().selectParentNode().setColor('#ffa311').run()
            console.log(editor.getJSON())
            const html = editor.getHTML();
            let selectedText = '';
            if (html.includes('<span style="color: #ffa311">')) {
                selectedText = html.split('<span style="color: #ffa311">')[1].split('</span>')[0]
            }
            editor.chain().focus().setColor('#b6b6b6').toggleStrike().run();
            updateTransText(selectedText);
        };


        if (!editor) {
            return <span>Loading...</span>
        }

        return <>
            <BubbleMenu className={classes.bubbleMenu} tippyOptions={{duration: 100}} editor={editor} pluginKey="BubbleOne">
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
                        if (editor.isActive('textStyle', {color: color})) {
                            editor.chain().focus().setColor('#000000').run()
                        } else {
                            editor.chain().focus().setColor(color).run()
                        }
                    }}
                >
                    <RiPencilLine/>
                </div>

                <div
                    className={classes.icon}
                    onClick={()=> clickAlignHandler(editor)}
                >
                    <RiAlignCenter/>
                </div>

                <button
                    onClick={transferNotes}
                    className={editor.isActive('strike') ? classes.isActive : ''}
                >
                    轉移到
                </button>

            </BubbleMenu>
        </>
    }
;

export default BubbleList;