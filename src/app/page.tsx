import { AnimationWrapper } from "@/components/animationWrapper"
import Link from "next/link"


export default async function Home() {
  return (
    <AnimationWrapper>
      <main className="flex flex-col items-center">
        <h1 className="text-5xl font-bold mb-5">Summariser</h1>
        <p className="max-w-xl text-2xl text-center mb-5">
          Send out a form where people can ask questions, and Summariser will filter out the unique questions and rank them.
        </p>
        <div className="text-2xl">
          <Link href="/register" className="text-sky-700">Sign up</Link> or <Link href="/login" className="text-sky-700">Sign In</Link>
        </div>
      </main>
    </AnimationWrapper>
  )
}
