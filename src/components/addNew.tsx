'use client'

import { Button, Card, CardBody, Input } from "@nextui-org/react"
import { useEffect, useState } from "react"
import { AiOutlinePlus } from "react-icons/ai"

type AddNewProps = {
    callback: (content: string) => void,
    placeHolder: string
    validator: (content: string) => { isValid: boolean, message: string }
}

export function AddNew(props: AddNewProps) {
    const { callback, placeHolder, validator } = props
    const [content, setContent] = useState('')
    const [isValid, setIsValid] = useState(true)
    const [validationMessage, setValidationMessage] = useState('')
    const [untouched, setUntouched] = useState(true)

    useEffect(() => {
        if (!untouched) {
            const validation = validator(content)
            setIsValid(validation.isValid)
            setValidationMessage(validation.message)
        }
    }, [content])

    const handleContent = function(content: string) {
        setUntouched(false)
        setContent(content)
    }

    const handleAction = function(content: string) {
        if (isValid) callback(content)
    }

    return (
        <Card className="mb-5">
            <CardBody>
                <form
                    className="inline-flex"
                    action={() => handleAction(content)}
                >
                    <Input
                        className="mr-5"
                        type="text"
                        required
                        value={content}
                        onChange={(e) => handleContent(e.target.value)}
                        id='title'
                        placeholder={placeHolder}
                        validationState={isValid ? 'valid' : 'invalid'}
                        errorMessage={validationMessage}
                    />
                    <Button
                        type="submit"
                        isIconOnly
                    >
                        <AiOutlinePlus />
                    </Button>
                </form>
            </CardBody>
        </Card>
    )
}