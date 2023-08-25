import { LoginButton, LogoutButton } from "@/components/auth"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "./api/auth/[...nextauth]/route"


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
    </main>
  )
}
