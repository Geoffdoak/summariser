'use server'

import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { GroupedQuestionType } from "@/actions/openAI/openai"

type SessionWithId = {
    user: {
        name: string,
        email: string,
    },
    id: string
}

export async function setGroupedQuestions(
    questionnnaireId: string, groupedQuestions: GroupedQuestionType[]
) {
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