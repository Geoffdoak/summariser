import { prisma } from '@/lib/prisma'
import { hash } from 'bcrypt'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json()

    const regex =  new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i)
    if (!regex.test(email)) throw Error('Not valid email')
    if (name.length < 2) throw Error('Name must be longer than one character')
    if (password.length < 6) throw Error('Password must be at least six characters')
    
    const hashed = await hash(password, 12)

    const user = await prisma.user.create({
      data: {
        email,
        password: hashed,
        name
      }
    })

    return NextResponse.json({
      user: {
        email: user.email
      }
    })
  } catch (err: any) {
    return new NextResponse(
      JSON.stringify({
        error: err.message
      }),
      {
        status: 500
      }
    )
  }
}