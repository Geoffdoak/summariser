'use client'

import { useEffect, useState } from "react"
import { getQuestions } from "@/actions"
import Question from "@/components/question";

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
            {!content || (content.length < 1) && (
                <div>No questions yet</div>
            )}
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
    )
}