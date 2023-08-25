'use client'

import { Button, Card, CardBody, CardHeader } from "@nextui-org/react"
import { LayoutGroup, motion } from "framer-motion"
import NextLink from "next/link"
import DeleteButton from "./deleteButton"
import { AiOutlinePlus } from "react-icons/ai"

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
        <motion.div layout>
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
                                className="mr-3"
                                href={'./question/' + id}
                                as={NextLink}
                                isIconOnly
                                color="success"
                            >
                                <AiOutlinePlus />
                            </Button>
                            <Button
                                href={'/summary/' + id}
                                as={NextLink}
                            >
                                Summary
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
        </motion.div>
    )
}