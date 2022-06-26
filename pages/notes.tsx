import type {GetStaticProps, NextPage} from 'next';
import MarkdownCard from "../components/Markdown/MarkdownCard";
import {getSession, GetSessionOptions} from "next-auth/client";
import { ParsedUrlQuery } from "querystring";
import {IncomingMessage} from "http";
import {CustomGetServerSideProps} from "../types/CustomServerSideProps";

const DUMMY_CONTENT = [{title:'Daily',content:{
        "type": "doc",
        "content": [
            {
                "type": "paragraph",
                "content": [
                    {
                        "type": "text",
                        "text": "把每天想要寫的筆記寫在這邊。"
                    }
                ]
            },
            {
                "type": "paragraph",
                "content": [
                    {
                        "type": "text",
                        "text": "可以善用事件、任務、註解等要素完成寫子彈筆記。"
                    }
                ]
            },
            {
                "type": "paragraph"
            },
            {
                "type": "paragraph",
                "content": [
                    {
                        "type": "text",
                        "text": "浮動的選項有兩種：新行預設的與選取文字後的，如果覺得浮動開關很煩，可以從右下角的設定中關掉。"
                    }
                ]
            }
        ]
    }},{title:'Monthly',content:'This is monthly log!'},{title:'Future',content:`
    <p>
      Markdown shortcuts make it easy to format the text while typing.
    </p>
    <p>
      To test that, start a new line and type <code>#</code> followed by a space to get a heading. Try <code>#</code>, <code>##</code>, <code>###</code>, <code>####</code>, <code>#####</code>, <code>######</code> for different levels.
    </p>
    <p>
      Those conventions are called input rules in tiptap. Some of them are enabled by default. Try <code>></code> for blockquotes, <code>*</code>, <code>-</code> or <code>+</code> for bullet lists, or <code>\`foobar\`</code> to highlight code, <code>~~tildes~~</code> to strike text, or <code>==equal signs==</code> to highlight text.
    </p>
    <p>
      You can overwrite existing input rules or add your own to nodes, marks and extensions.
    </p>
    <p>
      For example, we added the <code>Typography</code> extension here. Try typing <code>(c)</code> to see how it’s converted to a proper © character. You can also try <code>-></code>, <code>>></code>, <code>1/2</code>, <code>!=</code>, or <code>--</code>.
    </p>
    `}]

const NotesPage: NextPage = (props) => {
    return <>
        <MarkdownCard contents={DUMMY_CONTENT}/>
    </>
}
export default NotesPage;


export const getServerSideProps:CustomGetServerSideProps = async (context)=> {

    const session = await getSession({req:context.req});

    if(!session) {
        return{
            redirect:{
                destination:'/auth', // 描述重新定向的位置
                permanent:false // 它是永久的還是只有一次
            }
        }
    }
    return{
        props:{session}
    }
}