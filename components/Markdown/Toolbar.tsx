import React, {FC} from 'react';
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
import {createLink} from "../../lib/clipboard";
import useJournal from "../../hooks/useJournal";

type ToolbarProps = {title:string,editor:Editor}

const Toolbar:FC<ToolbarProps> = ({title,editor}) =>{
    const {setJournals}=useJournal();

    if(!editor){return <span>Loading</span>}

    // const { observe, inView } = useInView({
    //     rootMargin: '-1px 0px 0px 0px',
    //     threshold: [1],
    // })

    return <>
    <div className={classes.Toolbar}>
        <ActionIcon onClick={() => editor.chain().focus().toggleBold().run()}>
            <RiBold />
        </ActionIcon>
        <ActionIcon onClick={() => editor.chain().focus().toggleItalic().run()}>
            <RiItalic />
        </ActionIcon>
        <ActionIcon onClick={() => editor.chain().focus().toggleStrike().run()}>
            <RiStrikethrough />
        </ActionIcon>
        <ActionIcon onClick={() => editor.chain().focus().toggleCode().run()}>
            <RiCodeSSlashLine />
        </ActionIcon>
        <ActionDivider/>
        <ActionIcon
            onClick={() => editor.chain().focus().toggleOrderedList().run()}>
            <RiListOrdered />
        </ActionIcon>
        <ActionIcon
            onClick={() => editor.chain().focus().toggleBulletList().run()}>
            <RiListUnordered />
        </ActionIcon>
        <ActionIcon
            onClick={() => editor.chain().focus().toggleTaskList().run()}>
            <RiCheckboxLine />
        </ActionIcon>
        <ActionIcon
            onClick={() => editor.chain().focus().toggleBlockquote().run()}>
            <RiDoubleQuotesL />
        </ActionIcon>

        <ActionDivider/>

        <ActionIcon
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}>
            <RiCodeBoxLine />
        </ActionIcon>
        <ActionIcon
            onClick={() => editor.chain().focus().setHorizontalRule().run()}>
            <RiSeparator />
        </ActionIcon>
        <ActionIcon
            onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}>
            <RiFormatClear />
        </ActionIcon>
        <ActionIcon onClick={() => setLink(editor)}>
            <RiLink />
        </ActionIcon>

        <ActionDivider/>

        <ActionIcon onClick={ async () => {
            const json = editor.getJSON()
            await setJournals({title, content:json});
        }}>
            <RiSave3Line />
        </ActionIcon>
        <ActionIcon>
            <RiSettings3Line/>
        </ActionIcon>
        {/*<div className={classes.icon} onClick={() => editor.chain().focus().undo().run()}>*/}
        {/*    <RiArrowGoBackLine />*/}
        {/*</div>*/}
        {/*<div className={classes.icon} onClick={() => editor.chain().focus().redo().run()}>*/}
        {/*    <RiArrowGoForwardLine />*/}
        {/*</div>*/}
    </div>
    </>
};

export default Toolbar;