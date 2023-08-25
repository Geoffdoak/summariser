'use client'

import { useEffect, useState } from "react"
import { addTest, getTests, getQuestionnaires, createQuestionnaire } from "@/actions"
import { Questionnaire } from "@/components/questionnaire"
import { Button, Card, CardBody, Input } from "@nextui-org/react";
import { AiOutlinePlus } from 'react-icons/ai'
import { AddNew } from "@/components/addNew";
import { removeQuestionnaire } from "@/actions"


type returnedTests = {
    questionnaires: {
        id: string;
        title: string;
        questions: {
            id: string;
            questionnaireId: string;
            content: string;
        }[];
    }[]
} | null

export default function Content() {
    const [tests, setTests] = useState(null as returnedTests)

    const handleClick = async function (content: string) {
        await createQuestionnaire(content)
        const returnedTests = await getQuestionnaires()
        setTests(returnedTests)
    }

    const removeHandler = async function(questionnaireId: string) {
        await removeQuestionnaire(questionnaireId)
        const returnedTests = await getQuestionnaires()
        setTests(returnedTests)
    }

    const initialTests = async function () {
        const returnedTests = await getQuestionnaires()
        if (returnedTests) setTests(returnedTests)
    }

    useEffect(() => {
        initialTests()
    }, [])

    return (
        <div>
            <AddNew
                callback={handleClick}
                placeHolder={"Add a new questionnaire"}
            />
            {tests && tests.questionnaires.map(test => {
                return (
                    <Questionnaire
                        key={test.id}
                        title={test.title}
                        id={test.id}
                        questions={test.questions}
                        removeHandler={removeHandler}
                    />
                )
            })}
        </div>
    )
}