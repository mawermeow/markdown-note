import {FC} from 'react';
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

type ToolbarProps = {editor:Editor}

const Toolbar:FC<ToolbarProps> = ({editor}) =>{

    if(!editor){return <span>Loading</span>}

    // const { observe, inView } = useInView({
    //     rootMargin: '-1px 0px 0px 0px',
    //     threshold: [1],
    // })

    return <>
    <div className={classes.Toolbar}>
        <div className={classes.icon} onClick={() => editor.chain().focus().toggleBold().run()}>
            <RiBold />
        </div>
        <div className={classes.icon} onClick={() => editor.chain().focus().toggleItalic().run()}>
            <RiItalic />
        </div>
        <div className={classes.icon} onClick={() => editor.chain().focus().toggleStrike().run()}>
            <RiStrikethrough />
        </div>
        <div className={classes.icon} onClick={() => editor.chain().focus().toggleCode().run()}>
            <RiCodeSSlashLine />
        </div>
        <div className={classes.divider}/>
        <div
            className={classes.icon}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}>
            <RiListOrdered />
        </div>
        <div
            className={classes.icon}
            onClick={() => editor.chain().focus().toggleBulletList().run()}>
            <RiListUnordered />
        </div>
        <div
            className={classes.icon}
            onClick={() => editor.chain().focus().toggleTaskList().run()}>
            <RiCheckboxLine />
        </div>
        <div
            className={classes.icon}
            onClick={() => editor.chain().focus().toggleBlockquote().run()}>
            <RiDoubleQuotesL />
        </div>

        <div className={classes.divider}/>

        <div
            className={classes.icon}
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}>
            <RiCodeBoxLine />
        </div>
        <div
            className={classes.icon}
            onClick={() => editor.chain().focus().setHorizontalRule().run()}>
            <RiSeparator />
        </div>
        <div
            className={classes.icon}
            onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}>
            <RiFormatClear />
        </div>

        <div className={classes.divider}/>

        <div className={classes.icon} onClick={() => setLink(editor)}>
            <RiLink />
        </div>

        <div className={classes.divider}/>

        <div className={classes.icon} onClick={() => console.log(editor.getJSON())}>
            <RiSave3Line />
        </div>
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