'use client'

import { createQuestion } from "@/actions/database/createQuestion"
import { AddNew } from "@/components/addNew"
import { AnimationWrapper } from "@/components/animationWrapper"
import { Button, Card, CardBody } from "@nextui-org/react"
import { useState } from "react"

export default function Page({ params }: { params: { slug: string } }) {
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(false as boolean | string)

  const handleError = function (error: string) {
    setError(error)
    console.log(error)
  }

  const handleClick = async function (content: string) {
    try {
      setIsSubmitting(true)
      const create = await createQuestion(params.slug, content)

      if (create.error) {
        handleError(JSON.stringify(error))
      }

      setIsSubmitting(false)
      setHasSubmitted(true)
    } catch (error) {
      handleError(JSON.stringify(error))
    }
  }

  const validator = function (content: string) {
    if (content.length < 4) return { isValid: false, message: 'Must be at least 3 characters' }
    return { isValid: true, message: '' }
  }

  return (
    <AnimationWrapper>
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
                {error ? 'Error adding question. Try again' : 'Success!'}
              </div>
              <Button onPress={() => setHasSubmitted(false)}>Add another question</Button>
            </div>
          </CardBody>
        </Card>
      )}
    </AnimationWrapper>
  )
}