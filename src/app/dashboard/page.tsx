import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import DashboardClient from './dashboard-client'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.email) {
    redirect('/auth/signin')
  }

  // Check if user has favorite movie
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { favoriteMovie: true, name: true, email: true, image: true }
  })

  if (!user?.favoriteMovie) {
    redirect('/onboarding')
  }

  return <DashboardClient user={user} />
}