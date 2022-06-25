import {FC, useEffect, useState} from 'react';
import classes from "./MarkdownCard.module.css";
import MarkdownEditor from "./MarkdownEditor";

type LogProps = {title:string, content:string|{}};
type MarkdownCardProps = {contents: LogProps[]};
type CardButtonProps = {value:string,isFirst?:boolean};

const MarkdownCard:FC<MarkdownCardProps> = ({contents}) => {
    const [isLeftLog, setIsLeftLog] = useState(true);
    const [tag, setTag] = useState('Daily');

    const CardButton:FC<CardButtonProps> = ({value,isFirst})=>{
        const clickHandler=()=>{
            if(isFirst){
                setIsLeftLog(true);
            }else{
                setIsLeftLog(false);
            }
            setTag(value);
        };
        return <button
            className={`${tag===value?classes.isActive:classes.notActive}`}
            onClick={clickHandler}>
            {value}
        </button>
    }

    let firstLog = true;
    const cardButtonList = contents.map(content=>{
        if(firstLog){
            firstLog = false;
            return <CardButton value={content.title} isFirst={true} key={content.title}/>
        }
        return <CardButton value={content.title} key={content.title} />
    });

    const editorList = contents.map(content=>{
        return <MarkdownEditor
            content={content.content}
            isVisible={tag===content.title? undefined : false}
            isLeftLog={isLeftLog}
            key={content.title}
        />
    });

    return <div className={classes.range}>
        {cardButtonList}
        <button className={classes.notActive}>+</button>
        {editorList}
        {/*<CardButton value='Daily' isFirst={true}/>*/}
        {/*<CardButton value='Monthly' />*/}
        {/*<CardButton value='Future' />*/}
        {/*<MarkdownEditor content={dailyLog} isVisible={tag==='Daily'? undefined : false} isLeftLog={isLeftLog}/>*/}
        {/*<MarkdownEditor content={monthlyLog} isVisible={tag==='Monthly'? undefined : false} isLeftLog={isLeftLog}/>*/}
        {/*<MarkdownEditor content={futureLog} isVisible={tag==='Future'? undefined : false} isLeftLog={isLeftLog}/>*/}
    </div>
}

export default MarkdownCard;