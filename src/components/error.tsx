'use client'

import { Card } from "@nextui-org/card";
import { Button, CardBody, CardHeader } from "@nextui-org/react";
import { createContext, useState, ReactNode } from "react";

export const ErrorNotificationContext = createContext((message: string)=>{})

type ErrorNotficationProps = {
    children: ReactNode
}

export default function ErrorNotfication(props: ErrorNotficationProps) {
    const [error, setError] = useState('')
    const [isOpen, setIsOpen] = useState(false)

    const showError = function(message: string) {
        setError(message)
        setIsOpen(true)
    }

    const clear = function() {
        setIsOpen(false)
        setError('')
    }

    return (
        <ErrorNotificationContext.Provider value={showError}>
            {isOpen && (
                <Card className="max-w-lg m-auto border-2 border-rose-500">
                    <CardHeader className="text-large mb-0">
                        Error:
                    </CardHeader>
                    <CardBody>
                        <div className="mb-5">{error}</div>
                        <Button onPress={clear} variant="bordered" color="danger">Close</Button>
                    </CardBody>
                </Card>
            )}
            {props.children}
        </ErrorNotificationContext.Provider>
    )
}