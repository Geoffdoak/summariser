'use client'

import { useEffect, useState } from "react"
import { getQuestionnaires, createQuestionnaire, removeQuestionnaire } from "@/actions"
import { Questionnaire } from "@/components/questionnaire"
import { AddNew } from "@/components/addNew";
import { AnimatePresence } from "framer-motion";
import { AnimationWrapper } from "@/components/animationWrapper";


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

    const handleAdd = async function (content: string) {
        await createQuestionnaire(content)
        const returnedTests = await getQuestionnaires()
        setTests(returnedTests)
    }

    const handleRemove = async function(questionnaireId: string) {
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
        <AnimationWrapper>
            <div>
                <AddNew
                    callback={handleAdd}
                    placeHolder={"Add a new questionnaire"}
                />
                <AnimatePresence>
                    {tests && tests.questionnaires.map(test => {
                        return (
                            <Questionnaire
                                key={test.id}
                                title={test.title}
                                id={test.id}
                                questions={test.questions}
                                removeHandler={handleRemove}
                            />
                        )
                    })}
                </AnimatePresence>
            </div>
        </AnimationWrapper>
    )
}