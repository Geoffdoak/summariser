'use server'

import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

type SessionWithId = {
    user: {
        name: string,
        email: string,
    },
    id: string
}

export async function getQuestions(questionnaireId: string) {
    'user server'

    try {
        const session = await getServerSession(authOptions) as SessionWithId
        if (!session || !session.user) throw Error('Not logged in')

        const questions = await prisma.question.findMany({
            where: {
                questionnaireId: questionnaireId
            }
        })

        return { body: questions }
    } catch (error) {
        console.log(error)
        return { error: 'Error retrieving questions' }
    }
}