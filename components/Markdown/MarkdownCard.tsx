import {FC, useEffect, useState} from 'react';
import classes from "./MarkdownCard.module.css";
import MarkdownEditor from "./MarkdownEditor";
import TopButton from "../ui/card/TopButton";
import TopBorder from "../ui/card/TopBorder";
import MainBorder from "../ui/card/MainBorder";
import ContentCard from "../ui/card/ContentCard";
import FetchStatus from "../ui/card/FetchStatus";

type LogProps = {title:string, content:string|{}};
type MarkdownCardProps = {contents: LogProps[]};


const MarkdownCard:FC<MarkdownCardProps> = ({contents}) => {
    const [isLeftLog, setIsLeftLog] = useState(true);
    const [tag, setTag] = useState('Daily');


    let firstButton=true;
    const topButtonList = contents.map(content=>{

        const value = content.title;
        let onClickHandler = () => {
            setTag(value);
            setIsLeftLog(false);
        };

        if(firstButton){
            onClickHandler = () => {
                setTag(value);
                setIsLeftLog(true);
            };
            firstButton = false;
        }

        return <TopButton
            key={value}
            isActive={tag===value}
            onClick={onClickHandler}
        >{value}</TopButton>
    });

    const editorList = contents.map(content=>{
        return <MainBorder
            isLeft={isLeftLog}
            key={content.title}
            isEditor={true}
            isVisible={tag===content.title}>

            <MarkdownEditor
                key={content.title}
                content={content.content}
            />
        </MainBorder>
    });

    return<ContentCard>
    <TopBorder>
        <div>
            {topButtonList}
            <TopButton isActive={false}>+</TopButton>
        </div>
        {/*<FetchStatus fetchStatus={fetchStatus}/>*/}
    </TopBorder>
    {editorList}
    </ContentCard>
}

export default MarkdownCard;