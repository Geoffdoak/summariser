'use client'

import { LoginButton, LogoutButton, SignUpButton } from "@/components/auth"
import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react"
import {AiFillHome} from 'react-icons/ai'

type MenuProps = {
    isSignedIn: boolean
}

export default function Menu(props: MenuProps) {
    const {isSignedIn} = props

    return (
        <Navbar className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            <NavbarBrand><AiFillHome color={'white'} size={'24px'}/></NavbarBrand>
            <NavbarContent justify='end'>
                <NavbarItem>
                    {!isSignedIn && (
                        <>
                            <SignUpButton className="mr-3"/>
                            <LoginButton/>
                        </>
                    )}
                    {isSignedIn && (
                        <LogoutButton />
                    )}
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    )
}