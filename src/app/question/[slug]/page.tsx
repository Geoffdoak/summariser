'use client'

import { createQuestion } from "@/actions/database/createQuestion"
import { AddNew } from "@/components/addNew"
import { AnimationWrapper } from "@/components/animationWrapper"
import { Button, Card, CardBody } from "@nextui-org/react"
import { useContext, useEffect, useState } from "react"
import { ErrorNotificationContext } from "@/components/error"
import { getQuestionnaire } from "@/actions/database/getQuestionnaire"

export default function Page({ params }: { params: { slug: string } }) {
  const [title, setTitle] = useState('')
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isError, setIsError] = useState(false)
  const updateError = useContext(ErrorNotificationContext)

  const updateTitle = async function () {
    const questionnnaire = await getQuestionnaire(params.slug)
    if (questionnnaire.body) setTitle(questionnnaire.body.title)
  }

  const handleError = function (error: string) {
    console.log(error)
    updateError(error)
  }

  const handleClick = async function (content: string) {
    try {
      setIsSubmitting(true)
      setIsError(false)
      const create = await createQuestion(params.slug, content)

      if (create.error) {
        handleError(JSON.stringify(create.error))
        setIsError(true)
      }

      setIsSubmitting(false)
      setHasSubmitted(true)
    } catch (error) {
      handleError(JSON.stringify(error))
    }
  }

  useEffect(() => {
    updateTitle()
  }, [])

  const validator = function (content: string) {
    if (content.length < 4) return { isValid: false, message: 'Must be at least 3 characters' }
    return { isValid: true, message: '' }
  }

  return (
    <AnimationWrapper>
      <h1 className="text-3xl mb-5">{'Questionnaire for: ' + title}</h1>
      {!hasSubmitted && (
        <AddNew
          callback={handleClick}
          placeHolder="Ask a question"
          validator={validator}
          isSubmitting={isSubmitting}
        />
      )}
      {hasSubmitted && (
        <Card>
          <CardBody>
            <div className="flex justify-between items-center text-large">
              <div>
                {isError ? 'Error adding question. Try again' : 'Success!'}
              </div>
              <Button onPress={() => setHasSubmitted(false)}>Add another question</Button>
            </div>
          </CardBody>
        </Card>
      )}
    </AnimationWrapper>
  )
}