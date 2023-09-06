'use client'

import { useContext, useEffect, useState } from "react"
import { removeQuestionnaire } from "@/actions/database/removeQuestionnaire"
import { createQuestionnaire } from "@/actions/database/createQuestionnaire"
import { getQuestionnaires } from "@/actions/database/getQuestionnaires"
import { Questionnaire } from "@/components/questionnaire"
import { AddNew } from "@/components/addNew";
import { AnimatePresence } from "framer-motion";
import { AnimationWrapper } from "@/components/animationWrapper";
import { Spinner } from "@nextui-org/spinner"
import { ErrorNotificationContext } from "@/components/error"

type QuestionnaireType = {
    title: string,
    id: string
}

export default function Content() {
    const [questionnaires, setQuestionnaires] = useState([] as QuestionnaireType[])
    const [isLoading, setisLoading] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const updateError = useContext(ErrorNotificationContext)

    const handleError = function (error: string) {
        console.log(error)
        updateError(error)
    }

    const handleAdd = async function (content: string) {
        try {
            setIsSubmitting(true)
            const create = await createQuestionnaire(content)

            if (create.error) {
                handleError(JSON.stringify(create.error))
                setIsSubmitting(false)
                return
            }

            await updateQuestionnaires()
            setIsSubmitting(false)
        } catch (error) {
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

            await updateQuestionnaires()
        } catch (error) {
            handleError(JSON.stringify(error))
        }
    }

    const updateQuestionnaires = async function () {
        const returnedTests = await getQuestionnaires()
        if (returnedTests && returnedTests.body) {
            const questionnaires = returnedTests.body.map(questionnaire => {
                return {
                    title: questionnaire.title,
                    id: questionnaire.id
                }
            })
            setQuestionnaires(questionnaires)
        }
        setisLoading(false)
    }

    useEffect(() => {
        updateQuestionnaires()
    }, [])

    const validator = function (content: string) {
        return {
            isValid: content.length > 2,
            message: 'Must be at least 3 characters'
        }
    }

    return (
        <AnimationWrapper>
                <h1 className="text-3xl mb-5">Questionnnaires</h1>
                <AddNew
                    callback={handleAdd}
                    placeHolder={"Add a new questionnaire"}
                    validator={validator}
                    isSubmitting={isSubmitting}
                />
                <AnimatePresence>
                    {isLoading && (
                        <div className="flex justify-center" >
                            <Spinner />
                        </div>
                    )}
                    {questionnaires.map(questionnaire => {
                        return (
                            <Questionnaire
                                key={questionnaire.id}
                                title={questionnaire.title}
                                id={questionnaire.id}
                                removeHandler={handleRemove}
                            />
                        )
                    })}
                </AnimatePresence>
        </AnimationWrapper>
    )
}