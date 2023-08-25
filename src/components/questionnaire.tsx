'use client'

import { Button, Card, CardBody, CardHeader } from "@nextui-org/react"
import NextLink from "next/link"
import { useEffect, useState } from "react"
// import { addTest, getTests, getQuestionnaires, createQuestionnaire } from "@/actions"
import { removeQuestionnaire } from "@/actions"
import {AiOutlineDelete} from 'react-icons/ai'

type QuestionnaireProps = {
    title: string,
    id: string,
    questions: {
        id: string;
        questionnaireId: string;
        content: string;
    }[],
    removeHandler: (questionnaireId: string) => void
}

export function Questionnaire(props: QuestionnaireProps) {
    const { title, id, questions, removeHandler } = props

    return (
        <Card
            className="mb-5"
        >
            <CardHeader className="px-5 pb-0">
                <h3
                    className="text-large"
                >
                    {title}
                </h3>
            </CardHeader>
            <CardBody
                className="flex"
            >
                <div
                    className="flex justify-stretch"
                >
                    <div className="flex justify-start">
                        <Button
                            className="mr-5"
                            href={'./question/' + id}
                            as={NextLink}
                        >
                            Add Question
                        </Button>
                        <Button
                            href={'/summary/' + id}
                            as={NextLink}
                        >
                            View Summary
                        </Button>
                    </div>
                    <div className="flex justify-end grow">
                        <Button
                            className="justify-self-end"
                            onPress={() => removeHandler(id)}
                            isIconOnly
                            color="danger"
                        >
                            <AiOutlineDelete />
                        </Button>
                    </div>
                </div>
            </CardBody>
            {/* <ul>
                {questions.map(q => {
                    return <li>{q.content}</li>
                })}
            </ul>             */}
        </Card>
    )
}