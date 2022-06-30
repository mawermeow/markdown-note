import {FC, ReactNode} from 'react';
import TopBorder from "../ui/card/top/TopBorder";
import TopButton from "../ui/card/top/TopButton";
import MainBorder from "../ui/card/MainBorder";
import Editor from "../tiptap/Editor";
import ContentCard from "../ui/card/ContentCard";
import ToolbarSelectForm from "../form/ToolbarSelectForm";
import NoteDeleteForm from "../form/NoteDeleteForm";

const directions = {
    "type": "doc",
    "content": [
        {
            "type": "paragraph",
            "content": [
                {
                    "type": "text",
                    "text": "tiptap shortcuts make it easy to format the text while typing."
                }
            ]
        },
        {
            "type": "paragraph",
            "content": [
                {
                    "type": "text",
                    "text": "To test that, start a new line and type "
                },
                {
                    "type": "text",
                    "marks": [
                        {
                            "type": "code"
                        }
                    ],
                    "text": "#"
                },
                {
                    "type": "text",
                    "text": " followed by a space to get a heading. Try "
                },
                {
                    "type": "text",
                    "marks": [
                        {
                            "type": "code"
                        }
                    ],
                    "text": "#"
                },
                {
                    "type": "text",
                    "text": ", "
                },
                {
                    "type": "text",
                    "marks": [
                        {
                            "type": "code"
                        }
                    ],
                    "text": "##"
                },
                {
                    "type": "text",
                    "text": ", "
                },
                {
                    "type": "text",
                    "marks": [
                        {
                            "type": "code"
                        }
                    ],
                    "text": "###"
                },
                {
                    "type": "text",
                    "text": ", "
                },
                {
                    "type": "text",
                    "marks": [
                        {
                            "type": "code"
                        }
                    ],
                    "text": "####"
                },
                {
                    "type": "text",
                    "text": ", "
                },
                {
                    "type": "text",
                    "marks": [
                        {
                            "type": "code"
                        }
                    ],
                    "text": "#####"
                },
                {
                    "type": "text",
                    "text": ", "
                },
                {
                    "type": "text",
                    "marks": [
                        {
                            "type": "code"
                        }
                    ],
                    "text": "######"
                },
                {
                    "type": "text",
                    "text": " for different levels."
                }
            ]
        },
        {
            "type": "paragraph",
            "content": [
                {
                    "type": "text",
                    "text": "Those conventions are called input rules in tiptap. Some of them are enabled by default. Try "
                },
                {
                    "type": "text",
                    "marks": [
                        {
                            "type": "code"
                        }
                    ],
                    "text": ">"
                },
                {
                    "type": "text",
                    "text": " for blockquotes, "
                },
                {
                    "type": "text",
                    "marks": [
                        {
                            "type": "code"
                        }
                    ],
                    "text": "*"
                },
                {
                    "type": "text",
                    "text": ", "
                },
                {
                    "type": "text",
                    "marks": [
                        {
                            "type": "code"
                        }
                    ],
                    "text": "-"
                },
                {
                    "type": "text",
                    "text": " or "
                },
                {
                    "type": "text",
                    "marks": [
                        {
                            "type": "code"
                        }
                    ],
                    "text": "+"
                },
                {
                    "type": "text",
                    "text": " for bullet lists, or "
                },
                {
                    "type": "text",
                    "marks": [
                        {
                            "type": "code"
                        }
                    ],
                    "text": "\`foobar\`"
                },
                {
                    "type": "text",
                    "text": " to highlight code, "
                },
                {
                    "type": "text",
                    "marks": [
                        {
                            "type": "code"
                        }
                    ],
                    "text": "~~tildes~~"
                },
                {
                    "type": "text",
                    "text": " to strike text, or "
                },
                {
                    "type": "text",
                    "marks": [
                        {
                            "type": "code"
                        }
                    ],
                    "text": "==equal signs=="
                },
                {
                    "type": "text",
                    "text": " to highlight text."
                }
            ]
        },
        {
            "type": "paragraph",
            "content": [
                {
                    "type": "text",
                    "text": "You can overwrite existing input rules or add your own to nodes, marks and extensions."
                }
            ]
        },
        {
            "type": "paragraph",
            "content": [
                {
                    "type": "text",
                    "text": "For example, we added the "
                },
                {
                    "type": "text",
                    "marks": [
                        {
                            "type": "code"
                        }
                    ],
                    "text": "Typography"
                },
                {
                    "type": "text",
                    "text": " extension here. Try typing "
                },
                {
                    "type": "text",
                    "marks": [
                        {
                            "type": "code"
                        }
                    ],
                    "text": "(c)"
                },
                {
                    "type": "text",
                    "text": " to see how it’s converted to a proper © character. You can also try "
                },
                {
                    "type": "text",
                    "marks": [
                        {
                            "type": "code"
                        }
                    ],
                    "text": "->"
                },
                {
                    "type": "text",
                    "text": ", "
                },
                {
                    "type": "text",
                    "marks": [
                        {
                            "type": "code"
                        }
                    ],
                    "text": ">>"
                },
                {
                    "type": "text",
                    "text": ", "
                },
                {
                    "type": "text",
                    "marks": [
                        {
                            "type": "code"
                        }
                    ],
                    "text": "1/2"
                },
                {
                    "type": "text",
                    "text": ", "
                },
                {
                    "type": "text",
                    "marks": [
                        {
                            "type": "code"
                        }
                    ],
                    "text": "!="
                },
                {
                    "type": "text",
                    "text": ", or "
                },
                {
                    "type": "text",
                    "marks": [
                        {
                            "type": "code"
                        }
                    ],
                    "text": "--"
                },
                {
                    "type": "text",
                    "text": "."
                }
            ]
        }
    ]
}

const Directions:FC = () =>{
    return <ContentCard>
        <TopBorder>
            <div>
                <TopButton isActive={true}>簡寫</TopButton>
                <TopButton isActive={false}>快捷鍵</TopButton>
                <TopButton isActive={false}>功能列</TopButton>
            </div>

        </TopBorder>
        <MainBorder isLeft={true} isVisible={true} isEditor={true}>
            <Editor content={directions} title='Directions(?)'/>
        </MainBorder>
        <NoteDeleteForm/>
        <ToolbarSelectForm/>
    </ContentCard>
};

export default Directions;