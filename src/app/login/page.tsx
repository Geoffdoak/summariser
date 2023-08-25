'use client'

import {  signIn } from "next-auth/react"
import { Button, Card, CardBody, CardHeader, Input } from '@nextui-org/react'
import { useState } from "react"

export default function SignIn() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const onSubmit = function() {
        signIn('credentials',{email: email,password:password, callbackUrl: '/dashboard'})
    }

  return (
    <Card className='max-w-md m-auto mt-5'>
    <CardHeader className='px-5 text-large'>Sign In</CardHeader>
    <CardBody>
      <form onSubmit={onSubmit}>
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
        <div className="w-full">
          <Button className="w-full" onPress={onSubmit}>
            Sign In
          </Button>
        </div>
      </form>
    </CardBody>
  </Card>
  )
}
