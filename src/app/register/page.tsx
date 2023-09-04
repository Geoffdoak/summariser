'use client'

import { Button, Card, CardBody, CardHeader, Input } from '@nextui-org/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AnimationWrapper } from '@/components/animationWrapper'
import useValidInput, { ValidatorType } from '@/hooks/forms/useValidInput'

const emailValidator: ValidatorType = function (input: string) {
  const regex = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i)
  return {
    isValid: regex.test(input),
    message: 'Must be valid email'
  }
}

const nameValidator: ValidatorType = function(input: string) {
  return {
    isValid: input.length > 1,
    message: 'Must be more than one character'
  }
}

const passwordValidator: ValidatorType = function(input: string) {
  return {
    isValid: input.length > 5,
    message: 'Must be at least six characters'
  }
}

export default function Register() {
  const email = useValidInput('', emailValidator)
  const password = useValidInput('', passwordValidator)
  const name = useValidInput('', nameValidator)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const allInputsValid = [email, password, name].reduce((prev, current) => {
    return prev && current.isValid
  }, true)

  const onSubmit = async function () {
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify({
          email: email.content,
          password: password.content,
          name: name.content
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (res.ok) {
        router.push('/login')
      } else {
        setError((await res.json()).error)
      }
    } catch (error: any) {
      setError(error?.message)
    }
  }

  return (
    <AnimationWrapper>
      <Card className='max-w-md m-auto mt-5'>
        <CardHeader className='px-5 text-large'>Sign Up</CardHeader>
        <CardBody>
          <form onSubmit={onSubmit}>
            <div className="mb-5">
              <Input
                label={'Name'}
                required
                value={name.content}
                onChange={(e) => name.set(e.target.value)}
                id="name"
                type="name"
                validationState={name.showError ? 'invalid' : 'valid'}
                errorMessage={name.message}
              />
            </div>
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
            {error && <div>{error}</div>}
            <div className="w-full">
              <Button
                className="w-full"
                onPress={onSubmit}
                isDisabled={!allInputsValid}
              >
                Register
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </AnimationWrapper>
  )
}