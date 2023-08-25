'use client'

import { useEffect, useState } from "react"
import { getQuestions } from "@/actions"
import Question from "@/components/question";
import { Button } from "@nextui-org/button";
import { AiOutlineReload } from "react-icons/ai";
import { AnimationWrapper } from "@/components/animationWrapper";

type QuestionsType = {
    id: string;
    questionnaireId: string;
    content: string;
}[] | null

export default function Page({ params }: { params: { slug: string } }) {
    const { slug } = params
    const [content, setContent] = useState(null as QuestionsType)

    const updateContent = async function() {
        const updatedContent = await getQuestions(slug)
        setContent(updatedContent)
    }

    useEffect(() => {
        updateContent()
    },[])
    
    return (
        <AnimationWrapper>
            <div>
                {!content || (content.length < 1) && (
                    <div>No questions yet</div>
                )}
                <div className="mb-5 flex justify-end">
                    <Button
                        onPress={updateContent}
                        color={'success'}
                        endContent={<AiOutlineReload/>}
                    >
                        Refresh
                    </Button>
                </div>
                {content && content.map((q, index) => {
                    return (
                        <Question
                            content={q.content}
                            index={index}
                            key={q.id}
                        />
                    )
                })}
            </div>
        </AnimationWrapper>
    )
}