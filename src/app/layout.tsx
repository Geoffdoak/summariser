import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import {Providers} from "./providers";
import { Navbar } from '@nextui-org/react';
import Menu from '@/components/menu';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
const inter = Inter({ subsets: ['latin'] })
import { authOptions } from "./api/auth/[...nextauth]/route"


export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const user = await prisma.user.findFirst({
    where: {
      email: 'test@test.com'
    }
  })

  const session = await getServerSession(authOptions)

  const isSignedIn = session?.user? true : false;
  
  return (
    <html lang="en">
        <body className={inter.className}>
          <Providers>
            <Menu isSignedIn={isSignedIn}></Menu>
            <div className="container mx-auto column-12 px-5 pt-5">
              {children}
            </div>
          </Providers>
        </body>
      </html>
  )
}
