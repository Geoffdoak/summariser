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

type SignUpButtonProps = {
    className?: string
}

export function SignUpButton(props: SignUpButtonProps) {
    return <Button href={'/register'} className={props.className} as={NextLink}>Sign Up</Button>
}