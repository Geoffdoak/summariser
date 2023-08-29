'use client'

import { useEffect, useState } from "react"
import { getQuestionnaires, createQuestionnaire, removeQuestionnaire } from "@/actions"
import { Questionnaire } from "@/components/questionnaire"
import { AddNew } from "@/components/addNew";
import { AnimatePresence } from "framer-motion";
import { AnimationWrapper } from "@/components/animationWrapper";

export default function Content() {
    const [questionnaires, setTests] = useState(null as Awaited<ReturnType<typeof getQuestionnaires>> | null)
    const [error, setError] = useState(null as null | string)

    const handleError = function(error: string) {
        // TODO: Add toast notification
        console.log(error)
        setError(error)
    }
    
    const handleAdd = async function (content: string) {
        try {
            const create = await createQuestionnaire(content)

            if (create.error) {
                handleError(JSON.stringify(create.error))
                return
            }
            
            const returnedTests = await getQuestionnaires()

            if (returnedTests.error) {
                handleError(returnedTests.error)
                return
            }

            setTests(returnedTests)
        } catch(error) {
            handleError(JSON.stringify(error))
        }
    }

    const handleRemove = async function (questionnaireId: string) {
        try {
            const remove = await removeQuestionnaire(questionnaireId)

            if (remove.error) {
                handleError(JSON.stringify(remove.error))
                return
            }
            
            const returnedTests = await getQuestionnaires()

            if (returnedTests.error) {
                handleError(returnedTests.error)
                return
            }

            setTests(returnedTests)
        } catch(error) {
            handleError(JSON.stringify(error))
        }
    }

    const initialTests = async function () {
        const returnedTests = await getQuestionnaires()
        if (returnedTests) setTests(returnedTests)
    }

    useEffect(() => {
        initialTests()
    }, [])

    const validator = function (content: string) {
        if (content.length < 4) return { isValid: false, message: 'Must be at least 3 characters' }
        return { isValid: true, message: '' }
      }

    return (
        <AnimationWrapper>
            <div>
                <h1 className="text-3xl mb-5">Questionnnaires</h1>
                <AddNew
                    callback={handleAdd}
                    placeHolder={"Add a new questionnaire"}
                    validator={validator}
                />
                <AnimatePresence>
                    {error}
                    {questionnaires?.body && questionnaires.body.map(test => {
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