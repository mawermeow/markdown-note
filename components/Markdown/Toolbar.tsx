import React, {FC, useEffect, useState} from 'react';
import {Editor} from "@tiptap/react/dist/packages/react/src/Editor";
import classes from "./Toolbar.module.css";
import {setLink} from "../../lib/setLink";

import {
    RiBold,
    RiItalic,
    RiStrikethrough,
    RiCodeSSlashLine,
    RiCodeBoxLine,
    RiLink,
    RiDoubleQuotesL,
    RiSeparator,
    RiFormatClear,
    RiArrowGoBackLine,
    RiArrowGoForwardLine, RiCheckboxLine,
    RiListOrdered,
    RiListUnordered,
    RiSettings3Line,
    RiSave3Line
} from 'react-icons/ri'
import ActionIcon from "../ui/card/ActionIcon";
import ActionDivider from "../ui/card/ActionDivider";
import useJournal from "../../hooks/useJournal";
import useUserHabits from "../../hooks/useUserHabits";

type ToolBoxItem = {name:string, icon:JSX.Element, method:()=>void };

type ToolbarProps = {
    title:string,
    editor:Editor,
    setComponent?:boolean,
}

const Toolbar:FC<ToolbarProps> = ({title,editor,setComponent}) =>{

    const {userToolbar, toggleTool, isToolbarSetMode, saveToolbarSetting} = useUserHabits();
    const {setJournals} = useJournal();



    const allToolbarList:ToolBoxItem[] = [
        {name:'bold', icon:<RiBold />, method:() => editor.chain().focus().toggleBold().run()},
        {name:'italic', icon:<RiItalic />, method:() => editor.chain().focus().toggleItalic().run()},
        {name:'strike', icon:<RiStrikethrough />, method:() => editor.chain().focus().toggleStrike().run()},
        {name:'code', icon:<RiCodeSSlashLine />, method:() => editor.chain().focus().toggleCode().run()},
        {name:'orderedList', icon:<RiListOrdered />, method:()=>editor.chain().focus().toggleOrderedList().run()},
        {name:'bulletList', icon:<RiListUnordered />, method:() => editor.chain().focus().toggleBulletList().run()},
        {name:'taskList', icon:<RiCheckboxLine />, method:() => editor.chain().focus().toggleTaskList().run()},
        {name:'blockQuote', icon:<RiDoubleQuotesL />, method:() => editor.chain().focus().toggleBlockquote().run()},
        {name:'blockCode', icon:<RiCodeBoxLine />, method:() => editor.chain().focus().toggleCodeBlock().run()},
        {name:'horizon', icon:<RiSeparator />, method:() => editor.chain().focus().setHorizontalRule().run()},
        {name:'clear', icon:<RiFormatClear />, method:() => editor.chain().focus().unsetAllMarks().clearNodes().run()},
        {name:'link', icon:<RiLink />, method:() => setLink(editor)},
        {name:'undo', icon:<RiArrowGoBackLine />, method:() => editor.chain().focus().undo().run()},
        {name:'redo', icon:<RiArrowGoForwardLine />, method:() => editor.chain().focus().redo().run()},
        {name:'save', icon:<RiSave3Line />, method: async() => await setJournals({title, content:editor.getJSON()})},
        {name:'divider1', icon:<>|</>, method:()=>toggleTool('divider1')},
        {name:'divider2', icon:<>|</>, method:()=>toggleTool('divider2')},
        {name:'divider3', icon:<>|</>, method:()=>toggleTool('divider3')}
    ];

    const allToolbarMenu = allToolbarList.map(tool=> <ActionIcon
        canDisabled={tool.name} key={tool.name} value={tool.icon} onClick={() => toggleTool(tool.name)}/>);

    let customToolbar:JSX.Element[]=[];
    let customToolbarMenu:JSX.Element[]=[];

    userToolbar.forEach(userTool=>{
        if(userTool.includes('divider')){
            customToolbar.push(<ActionDivider key={userTool} />);
            customToolbarMenu.push(<ActionDivider key={userTool} />)
        }else{
            let targetTool:ToolBoxItem|undefined={name:'',icon:<></>,method:()=>{}};
            targetTool = allToolbarList.find(tool=>userTool === tool.name);
            if(targetTool){
                const {name, icon ,method} = targetTool;
                customToolbar.push(<ActionIcon key={name} value={icon} onClick={method}/>);
                customToolbarMenu.push(<ActionIcon key={name} value={icon}
                                                   onClick={() => toggleTool(name)}/>)
            }
        }
    })

    if(!editor){return <span>Loading</span>}

    return <>
    <div className={classes.Toolbar}>
        {!setComponent && !isToolbarSetMode &&<>
            {customToolbar}
            <ActionIcon value={<RiSettings3Line/>} onClick={saveToolbarSetting}/>
        </>}
        {!setComponent && isToolbarSetMode &&<>
            {customToolbarMenu}
            <ActionIcon value={<RiSettings3Line/>} onClick={saveToolbarSetting}/>
        </>}
        { setComponent && isToolbarSetMode && allToolbarMenu }
    </div>
    </>
};

export default Toolbar;