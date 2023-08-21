'use client'

import {signIn, signOut} from 'next-auth/react'

export function LoginButton() {
    return <button onClick={() => signIn()}>Sign In</button>
}
export function LogoutButton() {
    return <button onClick={() => signOut()}>Sign Out</button>
}