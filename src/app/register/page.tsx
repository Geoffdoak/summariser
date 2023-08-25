'use client'

import { Button, Card, CardBody, CardHeader, Input } from '@nextui-org/react'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const onSubmit = async function() {
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify({
          email,
          password,
          name
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
    <Card className='max-w-md m-auto mt-5'>
      <CardHeader className='px-5 text-large'>Sign Up</CardHeader>
      <CardBody>
        <form onSubmit={onSubmit}>
          <div className="mb-5">
            <Input
              label={'Name'}
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="name"
              type="name"
            />
          </div>
          <div className="mb-5">
            <Input
              label={'Email'}
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              type="email"
            />
          </div>
          <div className="mb-5">
            <Input
              label={'Password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              type="password"
            />
          </div>
          {error && <div>{error}</div>}
          <div className="w-full">
            <Button className="w-full" onPress={onSubmit}>
              Register
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  )
}