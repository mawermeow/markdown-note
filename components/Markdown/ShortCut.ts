import {BulletList} from '@tiptap/extension-bullet-list'
import {TaskList} from "@tiptap/extension-task-list";
import {Blockquote} from "@tiptap/extension-blockquote";
import {OrderedList} from "@tiptap/extension-ordered-list";
import {Code} from "@tiptap/extension-code";
import {CodeBlock} from "@tiptap/extension-code-block";


export const CustomBulletList = BulletList.extend({
    addKeyboardShortcuts() {
        return {
            'Cmd-Alt-7': () => this.editor.commands.toggleBulletList(),
        }
    },
});

export const CustomOrderedList = OrderedList.extend({
    addKeyboardShortcuts() {
        return {
            'Cmd-Alt-8': () => this.editor.commands.toggleOrderedList(),
        }
    },
});

export const CustomBlockquote = Blockquote.extend({
    addKeyboardShortcuts() {
        return {
            'Cmd-Alt-9': () => this.editor.commands.toggleBlockquote(),
        }
    },
});

export const CustomTaskList = TaskList.extend({
    addKeyboardShortcuts() {
        return {
            'Cmd-Alt-0': () => this.editor.commands.toggleTaskList(),
        }
    },
});

export const CustomCode = Code.extend({
    addKeyboardShortcuts() {
        return {
            'Cmd-Alt-c': () => this.editor.commands.toggleCode(),
        }
    },
});

export const CustomCodeBlock = CodeBlock.extend({
    addKeyboardShortcuts() {
        return {
            'Cmd-Control-c': () => this.editor.commands.toggleCodeBlock(),
        }
    },
});