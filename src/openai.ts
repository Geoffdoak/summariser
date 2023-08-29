'use server'

import { getQuestionnaire, setGroupedQuestions } from "./actions"

function prompt(q1: string, q2: string) {
    return (
        `Are the following two questions asking the same thing? Answer yes or no:
        1: ${q1}
        2: ${q2}`
    )
}

async function getGptResponse(query: string) {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: "POST",
        headers: new Headers({
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            "Content-Type": "application/json",

        }),
        body: JSON.stringify({
            "model": "gpt-3.5-turbo",
            "messages": [{ "role": "user", "content": query }],
            "temperature": 0.7
        })
    })

    const body = await response.json()

    return body
}

type ComparisonType = 'YES' | 'NO' | 'ERROR'

async function compareQuestions(q1: string, q2: string): Promise<ComparisonType> {
    const query = prompt(q1, q2)

    const comparison = await getGptResponse(query)

    if (!comparison?.choices[0]?.message?.content) return 'ERROR'

    const response: string = comparison.choices[0].message.content

    if (response.toUpperCase().includes('YES')) return 'YES'

    return 'NO'
}

export type QuestionType = {
    content: string,
    id: string
}
export type GroupedQuestionType = {
    questionContent: string,
    askedQuestions: QuestionType[]
}

async function summarise(questions: QuestionType[]) {
    if (questions.length <= 0) return []

    const summary: GroupedQuestionType[] = []

    for (const question of questions) {
        if (summary.length === 0) {
            summary.push({
                questionContent: question.content,
                askedQuestions: []
            })
            continue
        }

        let grouped = false

        summary.sort((a, b) => {
            const compare = b.askedQuestions.length - a.askedQuestions.length
            return compare
        })

        for (const groupedQuestion of summary) {
            if (grouped) continue

            const isSame = await compareQuestions(groupedQuestion.questionContent, question.content)

            if (isSame == 'YES') {
                grouped = true
                groupedQuestion.askedQuestions.push(question)
                continue
            }
        }

        if (!grouped) summary.push({
            questionContent: question.content,
            askedQuestions: []
        })
    }
    return summary
}

export async function getSummary(questionnaireId: string) {
    'use server'

    try {
        console.log('get summary')
        const questionnaire = await getQuestionnaire(questionnaireId)
        if (!questionnaire.body) throw Error(questionnaire.error)


        if (questionnaire?.body?.summarised) {
            const groupQuestions = questionnaire.body.groupedQuestions.map(groupedQuestion => {
                const questionContent = groupedQuestion.content
                const askedQuestions = groupedQuestion.exampleQuestions.map(question => {
                    return {
                        id: question.id,
                        content: question.content
                    }
                })
                return { questionContent, askedQuestions }
            }) as GroupedQuestionType[]

            return { body: groupQuestions }
        }


        const questionsContent = questionnaire.body.questions.map(question => {
            return {
                content: question.content,
                id: question.id
            }
        })

        const summarisedQuestions = await summarise(questionsContent)

        await setGroupedQuestions(questionnaireId, summarisedQuestions)

        return {body: summarisedQuestions}

    } catch (error) {
        console.log(error)
        return { error: 'Error getting summary' }
    }
}