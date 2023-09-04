'use client'

import { signIn } from "next-auth/react"
import { Button, Card, CardBody, CardHeader, Input } from '@nextui-org/react'
import { AnimationWrapper } from "@/components/animationWrapper"
import useValidInput, { ValidatorType } from '@/hooks/forms/useValidInput'

const emailValidator: ValidatorType = function (input: string) {
  const regex = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i)
  return {
    isValid: regex.test(input),
    message: 'Must be valid email'
  }
}

const passwordValidator: ValidatorType = function(input: string) {
  return {
    isValid: input.length > 5,
    message: 'Must be at least six characters'
  }
}

export default function SignIn() {
  const email = useValidInput('', emailValidator)
  const password = useValidInput('', passwordValidator)
  const allInputsValid = email.isValid && password.isValid

  const onSubmit = async function () {
    const url = window.origin + '/dashboard'
    signIn('credentials', { email: email.content, password: password.content, callbackUrl: url })
  }

  return (
    <AnimationWrapper>
      <Card className='max-w-md m-auto mt-5'>
        <CardHeader className='px-5 text-large'>Sign In</CardHeader>
        <CardBody>
          <form onSubmit={onSubmit}>
            <div className="mb-5">
              <Input
                label={'Email'}
                required
                value={email.content}
                onChange={(e) => email.set(e.target.value)}
                id="email"
                type="email"
                validationState={email.showError ? 'invalid' : 'valid'}
                errorMessage={email.message}
              />
            </div>
            <div className="mb-5">
              <Input
                label={'Password'}
                required
                value={password.content}
                onChange={(e) => password.set(e.target.value)}
                id="password"
                type="password"
                validationState={password.showError ? 'invalid' : 'valid'}
                errorMessage={password.message}
              />
            </div>
            <div className="w-full">
              <Button
                className="w-full"
                onPress={onSubmit}
                isDisabled={!allInputsValid}
              >
                Sign In
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </AnimationWrapper>
  )
}
