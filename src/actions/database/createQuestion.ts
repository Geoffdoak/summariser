'use server'

import { prisma } from "@/lib/prisma"

export async function createQuestion(questionnaireId: string, content: string) {
    'user server'

    try {
        if (content.length < 4) throw Error('Question be longer than 3 characters')
        
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