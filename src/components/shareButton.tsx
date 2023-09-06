'use client'

import {Popover, PopoverTrigger, PopoverContent, Button} from "@nextui-org/react"
import { BsFillShareFill } from "react-icons/bs"

type ShareButtonProps = {
    qid: string,
    className?: string
}

export default function ShareButton(props: ShareButtonProps) {
    const { qid, className } = props
    const baseUrl = window.location.origin
    const link = baseUrl + '/question/' + qid
    
    const writeToClipboard = function () {
        window.navigator.clipboard.writeText(link);
    }

    return (
        <Popover placement="right">
        <PopoverTrigger>
            <Button
                className={className}
                onPress={writeToClipboard}
                size='sm'
                isIconOnly
            >
                <BsFillShareFill />
            </Button>
        </PopoverTrigger>
        <PopoverContent>
            <div className="px-1 py-2">
                <div className="text-small font-bold">Copied to clipboard</div>
            </div>
        </PopoverContent>
        </Popover>
    )
}