'use client'

import { Card, CardBody } from "@nextui-org/react"

type QuestionProps = {
    content: string,
    index: number
}

export default function Question(props: QuestionProps) {
    const { content, index } = props

    return (
        <Card className="mb-5">
            <CardBody>
                <div className="flex">
                    <div className="mr-3">
                        {(index + 1) + ':'}
                    </div>
                    <div>
                        {content}
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}