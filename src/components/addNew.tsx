'use client'

import { Button, Card, CardBody, Input } from "@nextui-org/react"
import { useState } from "react"
import { AiOutlinePlus } from "react-icons/ai"

type AddNewProps = {
    callback: (content: string) => void,
    placeHolder: string
}

export function AddNew(props: AddNewProps) {
    const [title, setTitle] = useState('')
    const { callback, placeHolder } = props
    return (
        <Card className="mb-5">
            <CardBody>
                <form
                    className="inline-flex"
                    action={() => callback(title)}
                >
                    <Input
                        className="mr-5"
                        type="text"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        id='title'
                        placeholder={placeHolder}
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