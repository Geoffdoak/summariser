'use client'

import Link from "next/link"
import { useEffect, useState } from "react"
// import { addTest, getTests, getQuestionnaires, createQuestionnaire } from "@/actions"

type QuestionnaireProps = {
    title: string,
    id: string,
    questions: {
        id: string;
        questionnaireId: string;
        content: string;
    }[]
}

export function Questionnaire(props: QuestionnaireProps) {
    const { title, id, questions } = props

    return (
        <div>
            <h3>{title}</h3>
            <Link
                href={'./question/' + id}
            >
                Add Question
            </Link>
            <ul>
                {questions.map(q => {
                    return <li>{q.content}</li>
                })}
            </ul>
        </div>
    )
}