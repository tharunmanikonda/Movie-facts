import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { favoriteMovie } = await request.json()
    
    if (!favoriteMovie) {
      return NextResponse.json({ error: 'Favorite movie is required' }, { status: 400 })
    }

    await prisma.user.update({
      where: { email: session.user.email },
      data: { favoriteMovie }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error saving favorite movie:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}