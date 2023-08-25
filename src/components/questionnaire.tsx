'use client'

import { Button, Card, CardBody, CardHeader } from "@nextui-org/react"
import NextLink from "next/link"
import DeleteButton from "./deleteButton"

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
        <Card className="mb-5">
            <CardHeader className="px-5 pb-0">
                <h3 className="text-large">
                    {title}
                </h3>
            </CardHeader>
            <CardBody className="flex">
                <div className="flex justify-stretch">
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
                        <DeleteButton
                            deleteHandler={() => removeHandler(id)}
                        />
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}