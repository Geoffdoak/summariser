'use client'

import { useEffect, useState } from "react"
import { getQuestions } from "@/actions"
import { Card, CardBody, CardHeader } from "@nextui-org/react";

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
        <div>
            {content && content.map((q, index) => {
                return (
                    <Card className="mb-5" key={q.id}>
                        <CardBody>
                            <div className="flex">
                                <div className="mr-3">
                                    {(index + 1) + ':'}
                                </div>
                                <div>
                                    {q.content}
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                )
            })}
        </div>
    )
}