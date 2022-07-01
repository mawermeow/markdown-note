import React, {FC, useEffect, useState} from 'react';
import {Editor} from "@tiptap/react/dist/packages/react/src/Editor";
import classes from "./Toolbar.module.css";
import {addImage, addLink, clickAlignHandler} from "../../lib/editorLib";
import JournalContext from "../../store/JournalContext";
import {useContext} from "react";

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
    RiArrowGoForwardLine,
    RiCheckboxLine,
    RiListOrdered,
    RiListUnordered,
    RiSettings3Line,
    RiSave3Line,
    RiImageLine,
    RiLayoutGridLine,
    RiInsertColumnLeft,
    RiInsertColumnRight,
    RiDeleteColumn,
    RiInsertRowTop,
    RiInsertRowBottom,
    RiDeleteRow,
    RiLayoutGridFill,
    RiLayout5Line,
    RiLayoutLeft2Line,
    RiLayoutTop2Line,
    RiAlignCenter,
    RiDeleteBinLine, RiIndentDecrease, RiIndentIncrease, RiAlignLeft, RiAlignRight, RiFileList2Line,
} from 'react-icons/ri'
import ActionIcon from "../ui/card/ActionIcon";
import ActionDivider from "../ui/card/ActionDivider";
import useJournal from "../../hooks/useJournal";
import useToolbar from "../../hooks/useToolbar";
import {ToolBoxItem} from "../../types/Journal";

type ToolbarProps = {
    title:string,
    editor:Editor,
    setComponent?:boolean,
}

const Toolbar:FC<ToolbarProps> = ({title,editor,setComponent}) =>{
    const {updateToolbarMenu,toggleTool, deleteHolder, updateDeleteHolder} = useContext(JournalContext);
    const {userToolbar, isToolbarSetMode, saveToolbarSetting} = useToolbar();
    const {updateContentToDB} = useJournal();

    const allToolbarList:ToolBoxItem[] = [
        {name:'bold', icon:<RiBold />, method:() => editor.chain().focus().toggleBold().run()},
        {name:'italic', icon:<RiItalic />, method:() => editor.chain().focus().toggleItalic().run()},
        {name:'strike', icon:<RiStrikethrough />, method:() => editor.chain().focus().toggleStrike().run()},
        {name:'clear', icon:<RiFormatClear />, method:() => editor.chain().focus().unsetAllMarks().clearNodes().run()},
        {name:'alignLeft', icon:<RiAlignLeft />, method:() => editor.commands.setTextAlign('left')},
        {name:'alignCenter', icon:<RiAlignCenter />, method:() => editor.commands.setTextAlign('center')},
        {name:'alignRight', icon:<RiAlignRight />, method:() => editor.commands.setTextAlign('right')},
        {name:'divider1', icon:<>|</>, method:()=>toggleTool('divider1')},
        {name:'blockQuote', icon:<RiDoubleQuotesL />, method:() => editor.chain().focus().toggleBlockquote().run()},
        {name:'orderedList', icon:<RiListOrdered />, method:()=>editor.chain().focus().toggleOrderedList().run()},
        {name:'bulletList', icon:<RiListUnordered />, method:() => editor.chain().focus().toggleBulletList().run()},
        {name:'taskList', icon:<RiCheckboxLine />, method:() => editor.chain().focus().toggleTaskList().run()},
        {name:'code', icon:<RiCodeSSlashLine />, method:() => editor.chain().focus().toggleCode().run()},
        {name:'blockCode', icon:<RiCodeBoxLine />, method:() => editor.chain().focus().toggleCodeBlock().run()},
        {name:'divider2', icon:<>|</>, method:()=>toggleTool('divider2')},
        {name:'horizon', icon:<RiSeparator />, method:() => editor.chain().focus().setHorizontalRule().run()},
        {name:'link', icon:<RiLink />, method:() => addLink(editor)},
        {name:'image', icon:<RiImageLine />, method:() => addImage(editor)},
        {name:'undo', icon:<RiArrowGoBackLine />, method:() => editor.chain().focus().undo().run()},
        {name:'redo', icon:<RiArrowGoForwardLine />, method:() => editor.chain().focus().redo().run()},
        {name:'save', icon:<RiSave3Line />, method: async() => await updateContentToDB({title, content:editor.getJSON()})},
        {name:'deleteNote', icon:<RiDeleteBinLine />, method:() => {deleteHolder?updateDeleteHolder(''):updateDeleteHolder(title)}},
        {name:'divider3', icon:<>|</>, method:()=>toggleTool('divider3')},
        {name:'table', icon:<RiLayoutGridLine />, method:() => editor.commands.insertTable({ rows: 3, cols: 3, withHeaderRow: true })},
        {name:'tableDel', icon:<RiLayoutGridFill />, method:() => editor.commands.deleteTable()},
        {name:'colLeft', icon:<RiInsertColumnLeft />, method:() => editor.commands.addColumnBefore()},
        {name:'colRight', icon:<RiInsertColumnRight />, method:() => editor.commands.addColumnAfter()},
        {name:'colDel', icon:<RiDeleteColumn />, method:() => editor.commands.deleteColumn()},
        {name:'rowTop', icon:<RiInsertRowTop />, method:() => editor.commands.addRowBefore()},
        {name:'rowBot', icon:<RiInsertRowBottom />, method:() => editor.commands.addRowAfter()},
        {name:'rowDel', icon:<RiDeleteRow />, method:() => editor.commands.deleteRow()},
        {name:'cellMerge', icon:<RiLayout5Line />, method:() => editor.commands.mergeOrSplit()},
        {name:'colHead', icon:<RiLayoutLeft2Line />, method:() => editor.commands.toggleHeaderColumn()},
        {name:'rowHead', icon:<RiLayoutTop2Line />, method:() => editor.commands.toggleHeaderRow()},
        {name:'tab', icon:<RiIndentIncrease />, method:() => editor.commands.sinkListItem('listItem')},
        {name:'shiftTab', icon:<RiIndentDecrease />, method:() => editor.commands.liftListItem('listItem')},
        {name:'console.log(json)', icon:<RiFileList2Line />, method:() => console.log(editor.getJSON())},
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
    });

    useEffect(()=>{
        updateToolbarMenu(allToolbarList);
    },[userToolbar])

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
        {/*{ setComponent && isToolbarSetMode && allToolbarMenu }*/}
    </div>
    </>
};

export default Toolbar;