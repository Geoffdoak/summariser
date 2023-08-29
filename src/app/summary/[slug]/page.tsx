'use client'

import { useEffect, useState } from "react"
import { getQuestions, getQuestionnaire } from "@/actions"
import Question from "@/components/question";
import { Button } from "@nextui-org/button";
import { AiOutlineReload } from "react-icons/ai";
import { AnimationWrapper } from "@/components/animationWrapper";
import { getSummary, GroupedQuestionType } from "@/openai";

type QuestionsType = {
    id: string;
    questionnaireId: string;
    content: string;
}[] | null

export default function Page({ params }: { params: { slug: string } }) {
    const { slug } = params
    const [content, setContent] = useState(null as GroupedQuestionType[] | null)
    const [secondContent, setSecondContent] = useState(null as any)

    const updateContent = async function () {
        // const secondContent = await getQuestionnaire(slug)
        // if (secondContent) setSecondContent(secondContent)
        const updatedContent = await getSummary(slug)
        if (updatedContent.body) setContent(updatedContent.body)
    }

    useEffect(() => {
        updateContent()
    }, [])

    return (
        <AnimationWrapper>
            <div>
                {/* {!content || (content.length < 1) && (
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
                })} */}
                {secondContent && JSON.stringify(secondContent)}
                {content && content.map((response, index) => {
                    return (
                        <li key={index}>
                            <h2>
                                {response.questionContent}
                            </h2>
                            <div>Ask count: {response.askedQuestions.length + 1}</div>
                            <ul className="ml-5">
                                {response.askedQuestions.map((q, index) => {
                                    return (
                                        <li key={index}>{q.content}</li>
                                    )
                                })}
                            </ul>
                        </li>
                    )
                })}
            </div>
        </AnimationWrapper>
    )
}