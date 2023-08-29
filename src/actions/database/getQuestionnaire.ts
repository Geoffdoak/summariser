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

export async function getQuestionnaire(questionnaireId: string) {
    'use server'

    try {
        const session = await getServerSession(authOptions) as SessionWithId
        if (!session || !session.user) throw Error('Not logged in')

        const questionnaire = await prisma.questionnaire.findUnique({
            where: {
                id: questionnaireId
            },
            select: {
                questions: true,
                groupedQuestions: {
                    select: {
                        content: true,
                        exampleQuestions: true
                    }
                },
                summarised: true
            }
        })

        return { body: questionnaire }
    } catch (error) {
        console.log(error)
        return { error: 'Error getting questionnaire' }
    }
}