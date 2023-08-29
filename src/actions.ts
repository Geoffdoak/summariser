'use server'

import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "./app/api/auth/[...nextauth]/route"
import { GroupedQuestionType } from "./openai"

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
            }
        })

        return { body: questionnaires }
    } catch (error) {
        console.log(error)
        return { error: 'Error getting questionnaires' }
    }
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

export async function createQuestionnaire(title: string) {
    'user server'

    try {
        const session = await getServerSession(authOptions) as SessionWithId    
        if (!session || !session.user) throw Error('Not logged in')

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

export async function removeQuestionnaire(questionnaireId: string) {
    'user serve'

    try {
        const session = await getServerSession(authOptions) as SessionWithId
        if (!session || !session.user) throw Error('Not logged in')

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

        return { error: false }
    } catch (error) {
        console.log(error)
        return { error: 'Error removing questionnaire' }
    }
}

export async function createQuestion(questionnaireId: string, content: string) {
    'user server'

    try {
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

        await prisma.questionnaire.update({
            where: {
                id: questionnaireId
            },
            data: {
                summarised: false
            }
        })

        return { error: false }
    } catch (error) {
        console.log(error)
        return { error: 'Error adding question' }
    }
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

export async function setGroupedQuestions(questionnnaireId: string, groupedQuestions: GroupedQuestionType[]) {
    'use server'

    try {
        const session = await getServerSession(authOptions) as SessionWithId
        if (!session || !session.user) throw Error('Not logged in')

        await prisma.groupedQuestion.deleteMany({
            where: {
                questionnaireId: questionnnaireId
            }
        })

        for (const groupedQuestion of groupedQuestions) {
            await prisma.groupedQuestion.create({
                data: {
                    questionnaireId: questionnnaireId,
                    content: groupedQuestion.questionContent,
                    exampleQuestions: {
                        connect: groupedQuestion.askedQuestions.map(askedQuestion => {
                            return {
                                id: askedQuestion.id
                            }
                        })
                    }
                }
            })
        }

        await prisma.questionnaire.update({
            where: {
                id: questionnnaireId
            },
            data: {
                summarised: true
            }
        })

        return { error: false }
    } catch (error) {
        console.log(error)
        return { error: 'Error setting grouped questions' }
    }
}