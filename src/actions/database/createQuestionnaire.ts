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

export async function createQuestionnaire(title: string) {
    'user server'

    try {
        const session = await getServerSession(authOptions) as SessionWithId
        if (!session || !session.user) throw Error('Not logged in')
        if (title.length < 4) throw Error('Title must be longer than 3 characters')

        await prisma.questionnaire.create({
            data: {
                title: title,
                user: {
                    connect: {
                        id: session.id
                    }
                }
            }
        })

        return { error: false }
    } catch (error) {
        console.log(error)
        return { error: 'Error creating questionnaire' }
    }
}