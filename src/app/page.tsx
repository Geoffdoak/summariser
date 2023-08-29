import { AnimationWrapper } from "@/components/animationWrapper"
import { LoginButton, LogoutButton } from "@/components/auth"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "./api/auth/[...nextauth]/route"
// import { TestSummarise } from "@/openai"


export default async function Home() {
  const user = await prisma.user.findFirst({
    where: {
      email: 'test@test.com'
    }
  })

  const session = await getServerSession(authOptions)

  // const response = await TestSummarise()

  return (
    <AnimationWrapper>
      <main>
        <LoginButton></LoginButton>
        <LogoutButton></LogoutButton>
        {user?.name}
        {JSON.stringify(session)}
        <ul>
          {/* {response.map((response, index) => {
            return (
              <li key={index}>
                <h2>
                  {response.questionContent}
                </h2>
                <div>Ask count: {response.askedQuestions.length + 1}</div>
                <ul className="ml-5">
                  {response.askedQuestions.map((q, index) => {
                    return (
                      <li key={index}>{q}</li>
                    )
                  })}
                </ul>
              </li>
            )
          })} */}
        </ul>
      </main>
    </AnimationWrapper>
  )
}
