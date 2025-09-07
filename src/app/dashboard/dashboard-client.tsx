'use client'

import { signOut } from 'next-auth/react'
import { useState } from 'react'
import Image from 'next/image'

interface DashboardClientProps {
  user: {
    name: string | null
    email: string | null
    image: string | null
    favoriteMovie: string | null
  }
}

export default function DashboardClient({ user }: DashboardClientProps) {
  const [movieFact, setMovieFact] = useState<string>('')
  const [loading, setLoading] = useState(false)

  const fetchMovieFact = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/movie-fact')
      if (response.ok) {
        const data = await response.json()
        setMovieFact(data.fact)
      }
    } catch (error) {
      console.error('Error fetching movie fact:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-gray-900 rounded-lg shadow-xl p-6 border border-gray-800">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-white">Dashboard</h1>
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Sign Out
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-lg font-semibold mb-4 text-white">Profile</h2>
              <div className="space-y-3 text-gray-300">
                {user.image && (
                  <Image
                    src={user.image}
                    alt="Profile"
                    width={64}
                    height={64}
                    className="rounded-full"
                  />
                )}
                <p><strong className="text-white">Name:</strong> {user.name}</p>
                <p><strong className="text-white">Email:</strong> {user.email}</p>
                <p><strong className="text-white">Favorite Movie:</strong> {user.favoriteMovie}</p>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-4 text-white">Movie Fact</h2>
              <button
                onClick={fetchMovieFact}
                disabled={loading}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 mb-4"
              >
                {loading ? 'Loading...' : 'Get Movie Fact'}
              </button>
              {movieFact && (
                <div className="bg-gray-800 p-4 rounded border border-gray-700">
                  <p className="text-gray-200">{movieFact}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}