'use client'

// import { Button } from "@nextui-org/react"
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure
} from "@nextui-org/react";
import { AiOutlineDelete } from "react-icons/ai"

type DeleteButtonProps = {
    deleteHandler: () => void
}

export default function DeleteButton(props: DeleteButtonProps) {
    const { deleteHandler } = props
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const onConfirm = function(close: ()=>void) {
        close()
        deleteHandler()
    }

    return (
        <>
            <Button
                className="justify-self-end"
                onPress={onOpen}
                isIconOnly
                color="danger"
                size='sm'
            >
                <AiOutlineDelete />
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Delete Questionnaire</ModalHeader>
                            <ModalBody>
                                <p>
                                    Are you sure you want to permanently delete this questionnaire?
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="danger" onPress={() => onConfirm(onClose)}>
                                    Delete
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}