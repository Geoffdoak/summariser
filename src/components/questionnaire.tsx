'use client'

import { Button, Card, CardBody, CardHeader } from "@nextui-org/react"
import { motion } from "framer-motion"
import NextLink from "next/link"
import DeleteButton from "./deleteButton"
import { AiOutlinePlus } from "react-icons/ai"
import ShareButton from "./shareButton"

type QuestionnaireProps = {
    title: string,
    id: string,
    removeHandler: (questionnaireId: string) => void
}

export function Questionnaire(props: QuestionnaireProps) {
    const { title, id, removeHandler } = props

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
                                size='sm'
                            >
                                <AiOutlinePlus />
                            </Button>
                            <ShareButton
                            className="mr-3"
                                qid={id}
                             />
                            <Button
                                href={'/summary/' + id}
                                as={NextLink}
                                size='sm'
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