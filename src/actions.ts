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

export async function getQuestionnaires() {
    'user server'

    const session = await getServerSession(authOptions) as SessionWithId

    if (!session || !session.user) return null

    const questionnaires = await prisma.user.findUnique({
        where: {
            id: session.id
        },
        select: {
            questionnaires: {
                orderBy:{
                    updatedAt: 'desc'
                },
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
                   id: session.id
                }
            }
        }
    })
}

export async function removeQuestionnaire(questionnaireId: string) {
    'user serve'

    const session = await getServerSession(authOptions) as SessionWithId

    if (!session || !session.user) return null

    await prisma.question.deleteMany({
        where: {
            questionnaireId: questionnaireId
        }
    })
    
    await prisma.questionnaire.delete({
        where: {
            id: questionnaireId,
            userId: session.id
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

export async function getQuestions(questionnaireId: string) {
    'user server'

    const session = await getServerSession(authOptions) as SessionWithId

    if (!session || !session.user) return null

    const questions = await prisma.question.findMany({
        where: {
            questionnaireId: questionnaireId
        }
    })

    return questions
}