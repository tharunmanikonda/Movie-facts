import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { generateMovieFact } from '@/lib/openai'

export async function GET() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { favoriteMovie: true }
    })

    if (!user?.favoriteMovie) {
      return NextResponse.json({ error: 'No favorite movie found' }, { status: 404 })
    }

    const fact = await generateMovieFact(user.favoriteMovie)
    
    return NextResponse.json({ fact, movie: user.favoriteMovie })
  } catch (error) {
    console.error('Error generating movie fact:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}