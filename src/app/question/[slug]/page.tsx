'use client'

import { createQuestion } from "@/actions"
import { AddNew } from "@/components/addNew"
import { Button, Card, CardBody } from "@nextui-org/react"
import { useState } from "react"

export default function Page({ params }: { params: { slug: string } }) {
  // const [content, setContent ] = useState('')
  const [hasSubmitted, setHasSubmitted] = useState(false)

  const handleClick = async function(content: string) {
      await createQuestion(params.slug, content)
      setHasSubmitted(true)
  }

  return (
    <>
      {!hasSubmitted && (
        <AddNew
          callback={handleClick}
          placeHolder="Ask a question"
        />
      )}
      {hasSubmitted && (
        <Card>
          <CardBody>
            <div className="flex justify-between items-center text-large">
              <div>
                Success!
              </div>
            <Button onPress={() => setHasSubmitted(false)}>Add another question</Button>
            </div>
          </CardBody>
        </Card>
      )}
    </>
  )
}