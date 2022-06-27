import {Editor} from "@tiptap/core";

const getPaste = async ()=>{
    const text =  await navigator.clipboard.readText();
    return text.toString();
};

export const createLink= (editor:Editor)=>{
    navigator.clipboard.readText().then(text=>{
        editor.commands.setLink({href:text});
    })
}