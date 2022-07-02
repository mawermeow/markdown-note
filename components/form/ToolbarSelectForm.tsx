import React, {FC} from 'react';
import classes from "./ToolbarSelectForm.module.css";
import {useContext} from "react";
import JournalContext from "../../store/JournalContext";
import MainBorder from "../ui/card/MainBorder";
import ActionIcon from "../ui/card/ActionIcon";

const ToolbarSelectForm:FC = () =>{
    const {toolbarMenu, isToolbarSetMode, toggleTool} = useContext(JournalContext);

    const allToolbarMenu = toolbarMenu.map(tool=> <ActionIcon
        canDisabled={tool.name} key={tool.name} value={tool.icon} onClick={() => toggleTool(tool.name)}/>);

    return <>
            <div className={`${classes.toolbarSelectForm} ${isToolbarSetMode?'':classes.isNotVisible}`}>
                {allToolbarMenu}
            </div>
    </>
};

export default ToolbarSelectForm;