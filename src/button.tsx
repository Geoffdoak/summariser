'use client'

import { useEffect, useState } from "react"
import { addTest, getTests } from "./actions"

export function Button() {
    const [tests, setTests] = useState('')

    const handleClick = async function() {
        await addTest()
        const returnedTests = await getTests()
        setTests(returnedTests)
    }

    const initialTests = async function() {
        const returnedTests = await getTests()
        setTests(returnedTests)
    }
    
    useEffect(() => {
        initialTests()
    }, [])

    return (
        <div>
            <form action={handleClick}>
                <button type="submit">Add test</button>
            </form>
            {tests ? tests : 'loading...'}
        </div>
    )
}