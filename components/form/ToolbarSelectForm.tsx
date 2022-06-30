import {FC} from 'react';
import classes from "./ToolbarSelectForm.module.css";
import {useContext} from "react";
import JournalContext from "../../store/JournalContext";
import MainBorder from "../ui/card/MainBorder";

const ToolbarSelectForm:FC = () =>{
    const {toolbarMenu, isToolbarSetMode} = useContext(JournalContext);

    return <>
        <MainBorder isLeft={false} isVisible={isToolbarSetMode}>
            <div className={classes.toolbarSelectForm}>
                {toolbarMenu}
            </div>

        </MainBorder>
    </>
};

export default ToolbarSelectForm;