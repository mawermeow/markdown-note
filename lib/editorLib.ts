import { Editor } from '@tiptap/react';
import {getCopyText} from "./clipboard";

export const addLink = (editor: Editor) =>{
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl)

    if (url === null) {
        return
    }

    if (url === '') {
        editor.chain().focus().extendMarkRange('link').unsetLink().run()

        return
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
}

export const hotKeyAddLink= (editor:Editor)=>{
    getCopyText().then(text=>{
        editor.commands.setLink({href:text});
    })
}

export const addImage = (editor:Editor) => {
    const url = window.prompt('URL')

    if (url) {
        editor.chain().focus().setImage({src: url}).run()
    }
}

export const hotKeyAddImage= (editor:Editor)=>{
    navigator.clipboard.readText().then(text=>{
        editor.commands.setImage({src:text});
    })
}

let alignCounter = 0;
export const clickAlignHandler = (editor:Editor) => {
    const textList = ['left', 'center', 'right'];
    let outPutText = textList[alignCounter];
    if (alignCounter < 2) {
        alignCounter += 1;
    } else {
        alignCounter = 0;
    }
    return editor.commands.setTextAlign(outPutText);
}