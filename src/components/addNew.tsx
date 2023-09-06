'use client'

import { Button, Card, CardBody, Input } from "@nextui-org/react"
import { AiOutlinePlus } from "react-icons/ai"
import useValidInput, { ValidatorType } from '@/hooks/forms/useValidInput'

type AddNewProps = {
    callback: (content: string) => void,
    placeHolder: string,
    validator: ValidatorType,
    isSubmitting: boolean
}

export function AddNew(props: AddNewProps) {
    const { callback, placeHolder, validator, isSubmitting } = props
    const input = useValidInput('', validator)

    const handleAction = function() {
        if (input.isValid) callback(input.content)
    }

    return (
        <Card className="mb-5">
            <CardBody>
                <div
                    className="inline-flex"
                >
                    <Input
                        className="mr-5"
                        type="text"
                        required
                        value={input.content}
                        onChange={(e) => input.set(e.target.value)}
                        id='title'
                        placeholder={placeHolder}
                        validationState={input.showError ? 'invalid' : 'valid'}
                        errorMessage={input.message}
                    />
                    <Button
                        type="submit"
                        isIconOnly
                        isLoading={isSubmitting}
                        isDisabled={!input.isValid || isSubmitting}
                        onPress={handleAction}
                    >
                        <AiOutlinePlus />
                    </Button>
                </div>
            </CardBody>
        </Card>
    )
}