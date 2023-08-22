'use client'

import { useEffect, useState } from "react"
import { addTest, getTests, getQuestionnaires, createQuestionnaire } from "./actions"
import { Questionnaire } from "./app/components/questionnaire"
import {Button} from "@nextui-org/react";


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
}

export function Content() {
    const [tests, setTests] = useState({questionnaires: []} as returnedTests)
    const [title, setTitle ] = useState('')

    const handleClick = async function() {
        await createQuestionnaire(title)
        const returnedTests = await getQuestionnaires() as returnedTests
        setTests(returnedTests)
    }

    const initialTests = async function() {
        const returnedTests = await getQuestionnaires() as returnedTests
        if (returnedTests) setTests(returnedTests)
    }
    
    useEffect(() => {
        initialTests()
    }, [])

    return (
        <div>
            <form action={handleClick}>
                <input 
                    type="text" 
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    id='title'
                />
                <Button type="submit">Add test</Button>
            </form>
            {tests.questionnaires.map(test => {
                return (
                    <Questionnaire
                        title= {test.title}
                        id= {test.id}
                        questions={test.questions}
                     />
                )
            })}
        </div>
    )
}