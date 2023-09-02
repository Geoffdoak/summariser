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

export async function removeQuestionnaire(questionnaireId: string) {
    'user serve'

    try {
        const session = await getServerSession(authOptions) as SessionWithId
        if (!session || !session.user) throw Error('Not logged in')

        await prisma.$transaction([
            prisma.groupedQuestion.deleteMany({
                where: {
                    questionnaireId: questionnaireId
                }
            }),
            prisma.question.deleteMany({
                where: {
                    questionnaireId: questionnaireId
                }
            }),
            prisma.questionnaire.delete({
                where: {
                    id: questionnaireId,
                    userId: session.id
                }
            })
        ])

        return { error: false }
    } catch (error) {
        console.log(error)
        return { error: 'Error removing questionnaire' }
    }
}