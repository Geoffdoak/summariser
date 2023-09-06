'use client'

import { Button } from "@nextui-org/react"
import { AiOutlineDelete } from "react-icons/ai"

type DeleteButtonProps = {
    deleteHandler: () => void
}

export default function DeleteButton(props: DeleteButtonProps) {
    const { deleteHandler } = props

    return (
        <Button
            className="justify-self-end"
            onPress={deleteHandler}
            isIconOnly
            color="danger"
            size='sm'
        >
            <AiOutlineDelete />
        </Button>
    )
}