import { useState } from "react"

export default function useValidInput(input: string, validator: ValidatorType) {
    const [content, set] = useState(input)
    const validated = validator(content)
    const isValid = validated.isValid
    const showError = !(isValid || content.length === 0)
    const message = showError ? validated.message : undefined
    return { content, set, isValid, showError, message }
}

export type ValidatorType = (input: string) => {
    isValid: boolean,
    message: string,
}