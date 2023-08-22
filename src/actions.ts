'use server'

import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "./app/api/auth/[...nextauth]/route"

type SessionWithId = {
    user: {
        name: string,
        email: string,
    },
    id: string
}

export async function addTest() {
    'use server'
    
    const user = await prisma.user.findFirst({
        where: {
          email: 'test@test.com'
        }
      })

    const session = await getServerSession(authOptions)

    const data = session?.user ? session?.user.name || 'no name' : 'no name';
    
    await prisma.test.create({
      data: {
        content: data
      }
    })
}

export async function getTests() {
    'use server'

    const tests = await prisma.test.findMany()
    return JSON.stringify(tests)
}

export async function getQuestionnaires() {
    'user server'

    const session = await getServerSession(authOptions) as SessionWithId

    if (!session || !session.user) return null

    const questionnaires = await prisma.user.findUnique({
        where: {
            id: parseInt(session.id)
        },
        select: {
            questionnaires: {
                select: {
                    title: true,
                    id: true,
                    questions: true
                }
            }
        }
    })

    return questionnaires
}

export async function createQuestionnaire(title: string) {
    'user server'

    const session = await getServerSession(authOptions) as SessionWithId

    if (!session || !session.user) return null

    await prisma.questionnaire.create({
        data: {
            title: title,
            user: {
                connect: {
                   id: parseInt(session.id)
                }
            }
        }
    })
}

export async function createQuestion(questionnaireId: string, content: string) {
    'user server'

    await prisma.question.create({
        data: {
            content: content,
            questionnaire: {
                connect: {
                   id: questionnaireId
                }
            }
        }
    })
}