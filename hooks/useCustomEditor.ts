import useJournal from "./useJournal";
import {useEditor} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import Typography from "@tiptap/extension-typography";
import Color from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import Link from "@tiptap/extension-link";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import Blockquote from "@tiptap/extension-blockquote";
import Code from "@tiptap/extension-code";
import CodeBlock from "@tiptap/extension-code-block";
import {Editor} from "@tiptap/core";
import useKeyPress from "./useKeyPress";

const createLink= (editor:Editor)=>{
    navigator.clipboard.readText().then(text=>{
        editor.commands.setLink({href:text});
    })
}

const CustomBulletList = BulletList.extend({
    addKeyboardShortcuts() {
        return {
            'Cmd-Alt-7': () => this.editor.commands.toggleBulletList(),
        }
    },
});

const CustomOrderedList = OrderedList.extend({
    addKeyboardShortcuts() {
        return {
            'Cmd-Alt-8': () => this.editor.commands.toggleOrderedList(),
        }
    },
});

const CustomBlockquote = Blockquote.extend({
    addKeyboardShortcuts() {
        return {
            'Cmd-Alt-9': () => this.editor.commands.toggleBlockquote(),
        }
    },
});

const CustomTaskList = TaskList.extend({
    addKeyboardShortcuts() {
        return {
            'Cmd-Alt-0': () => this.editor.commands.toggleTaskList(),
        }
    },
});

const CustomCode = Code.extend({
    addKeyboardShortcuts() {
        return {
            'Cmd-Alt-c': () => this.editor.commands.toggleCode(),
        }
    },
});

const CustomCodeBlock = CodeBlock.extend({
    addKeyboardShortcuts() {
        return {
            'Cmd-Control-c': () => this.editor.commands.toggleCodeBlock(),
        }
    },
});

const useCustomEditor = (title:string,content: string | {}) => {
    const {setJournals}=useJournal();

    const editor =  useEditor({
        extensions: [
            StarterKit.configure({
                bulletList: false,
                blockquote: false,
                orderedList: false,
                code: false,
                codeBlock: false,
            }),
            Highlight,
            Typography,
            TaskItem.configure({
                nested: true,
            }),
            Color,
            TextStyle,
            Link,
            CustomBulletList,
            CustomBlockquote,
            CustomOrderedList,
            CustomTaskList,
            CustomCode,
            CustomCodeBlock
        ],
        content: content,
        onUpdate: ({editor}) => {
            // send the content to an API here
        },
        onBlur:async ({editor})=>{
            const json = editor.getJSON()
            await setJournals({title, content:json});
        },
    });

    useKeyPress(['Meta', 'k'], (event:KeyboardEvent)=>{
        if(editor){
            createLink(editor);
        }
    });

    return editor;
}

export default useCustomEditor;