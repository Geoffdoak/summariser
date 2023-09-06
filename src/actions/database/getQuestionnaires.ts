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

export async function getQuestionnaires() {
    'user server'

    try {
        const session = await getServerSession(authOptions) as SessionWithId
        if (!session || !session.user) throw Error('Not logged in')

        const questionnaires = await prisma.questionnaire.findMany({
            where: {
                userId: session.id
            },
            select: {
                title: true,
                id: true,
                questions: true,
                summarised: true,
            },
            orderBy: {
                updatedAt: 'desc'
            }
        })

        return { body: questionnaires }
    } catch (error) {
        console.log(error)
        return { error: 'Error getting questionnaires' }
    }
}