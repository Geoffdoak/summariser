'use server'

import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "./app/api/auth/[...nextauth]/route"

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