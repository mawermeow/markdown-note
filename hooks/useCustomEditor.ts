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
import Image from '@tiptap/extension-image'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import TextAlign from '@tiptap/extension-text-align'
import useKeyPress from "./useKeyPress";
import {hotKeyAddImage, hotKeyAddLink} from "../lib/editorLib";


const CustomBulletList = BulletList.extend({
    addKeyboardShortcuts() {
        return {
            'Mod-Alt-7': () => this.editor.commands.toggleBulletList(),
        }
    },
});

const CustomOrderedList = OrderedList.extend({
    addKeyboardShortcuts() {
        return {
            'Mod-Alt-8': () => this.editor.commands.toggleOrderedList(),
        }
    },
});

const CustomBlockquote = Blockquote.extend({
    addKeyboardShortcuts() {
        return {
            'Mod-Alt-9': () => this.editor.commands.toggleBlockquote(),
        }
    },
});

const CustomTaskList = TaskList.extend({
    addKeyboardShortcuts() {
        return {
            'Mod-Alt-o': () => this.editor.commands.toggleTaskList(),
        }
    },
});

const CustomCode = Code.extend({
    addKeyboardShortcuts() {
        return {
            'Mod-Alt-c': () => this.editor.commands.toggleCode(),
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

const CustomHorizontalRule = HorizontalRule.extend({
    addKeyboardShortcuts() {
        return {
            'Cmd-Alt-s': () => this.editor.commands.setHorizontalRule(),
        }
    },
});

const useCustomEditor = (
    title:string,
    content:{}|string,
    notSave?:boolean
) => {
    const {updateContentToDB}=useJournal();

    const editor =  useEditor({
        extensions: [
            StarterKit.configure({
                bulletList: false,
                blockquote: false,
                orderedList: false,
                code: false,
                codeBlock: false,
                horizontalRule:false,
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
            CustomCodeBlock,
            CustomHorizontalRule,
            Image.configure({
                inline: true,
            }),
            Table.configure({
                resizable: true,
            }),
            TableRow,
            TableHeader,
            TableCell,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
        ],
        content: content,
        onBlur: async ({editor})=>{
            if(!notSave){
                const json = editor.getJSON()
                await updateContentToDB({title, content:json});
            }
        },
    });

    useKeyPress(['Meta', 'k'], (event:KeyboardEvent)=>{
        if(editor){
            hotKeyAddLink(editor);
        }
    });

    useKeyPress(['Meta', 'j'], (event:KeyboardEvent)=>{
        if(editor){
            hotKeyAddImage(editor);
        }
    });

    return editor;
}

export default useCustomEditor;