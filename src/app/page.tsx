import { LoginButton, LogoutButton } from "@/auth"
import { Button } from "@/button"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { Signika_Negative } from "next/font/google"
import { authOptions } from "./api/auth/[...nextauth]/route"

import { addTest } from "@/actions"

export default async function Home() {
  const user = await prisma.user.findFirst({
    where: {
      email: 'test@test.com'
    }
  })

  const session = await getServerSession(authOptions)

  return (
    <main>
      <LoginButton></LoginButton>
      <LogoutButton></LogoutButton>
      {user?.name}
      {JSON.stringify(session)}
      <Button
        callback={addTest}
       />
    </main>
  )
}
