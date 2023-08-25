'use client'

import { Button } from '@nextui-org/react'
import {signIn, signOut} from 'next-auth/react'

export function LoginButton() {
    return <Button onPress={() => signIn()}>Sign In</Button>
}
export function LogoutButton() {
    return <Button onPress={() => signOut()}>Sign Out</Button>
}