'use client'

import { useEffect, useState } from "react"
import { getQuestions, getQuestionnaire } from "@/actions"
import Question from "@/components/question";
import { Button } from "@nextui-org/button";
import { AiOutlineReload } from "react-icons/ai";
import { AnimationWrapper } from "@/components/animationWrapper";
import { getSummary, GroupedQuestionType } from "@/openai";
import { Accordion, AccordionItem, Spinner } from "@nextui-org/react";


type QuestionsType = {
    id: string;
    questionnaireId: string;
    content: string;
}[] | null

export default function Page({ params }: { params: { slug: string } }) {
    const { slug } = params
    const [content, setContent] = useState([] as GroupedQuestionType[])
    const [isLoading, setisLoading] = useState(false)

    const updateContent = async function () {
        console.log('update content')
        setisLoading(true)
        const updatedContent = await getSummary(slug)
        if (updatedContent.body) setContent(updatedContent.body)
        setisLoading(false)
    }

    useEffect(() => {
        updateContent()
    }, [])

    return (
        <AnimationWrapper>
            <div className="mb-5 flex justify-end">
                <Button
                    onPress={updateContent}
                    color={'success'}
                    endContent={<AiOutlineReload />}
                >
                    Refresh
                </Button>
            </div>
            {isLoading && (
                <div className="flex justify-center" >
                    <Spinner/>
                </div>
            )}
            {!isLoading && (
                <Accordion variant="splitted">
                    {/* {secondContent && JSON.stringify(secondContent)} */}
                    {content && content.map((response, index) => {
                        return (
                            <AccordionItem
                                key={index}
                                title={response.questionContent}
                                subtitle={'Asked: ' + (response.askedQuestions.length + 1)}
                                isCompact={true}
                            >
                                {response.askedQuestions.map((question, index) => {
                                    return (
                                        <div key={index}>{question.content}</div>
                                    )
                                })}
                            </AccordionItem>
                        )
                    })}
                </Accordion>
            )}
        </AnimationWrapper>
    )
}