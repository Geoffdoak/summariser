'use client'

import { Button } from '@nextui-org/react'
import {signIn, signOut} from 'next-auth/react'
import NextLink from "next/link"


export function LoginButton() {
    return <Button onPress={() => signIn()}>Sign In</Button>
}
export function LogoutButton() {
    return <Button onPress={() => signOut()}>Sign Out</Button>
}

export function SignUpButton() {
    return <Button href={'/register'} as={NextLink}>Sign Up</Button>
}