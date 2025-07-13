'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function TestEnvPage() {
  const [status, setStatus] = useState('Testing...')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function testConnection() {
      try {
        const supabase = createClient()
        
        // Test connection
        const { error } = await supabase
          .from('users')
          .select('count')
          .limit(1)
        
        if (error) {
          if (error.message.includes('relation "users" does not exist')) {
            setStatus('✅ Supabase connected! Tables need to be created.')
          } else {
            setError(error.message)
          }
        } else {
          setStatus('✅ Supabase connected and tables accessible!')
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      }
    }

    testConnection()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Environment Test
        </h1>
        
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Environment Variables:</h2>
            <div className="mt-2 space-y-2 text-sm">
              <div>
                <span className="font-medium">SUPABASE_URL:</span>
                <span className="ml-2 text-green-600">
                  {process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Set' : '❌ Missing'}
                </span>
              </div>
              <div>
                <span className="font-medium">SUPABASE_ANON_KEY:</span>
                <span className="ml-2 text-green-600">
                  {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Set' : '❌ Missing'}
                </span>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Connection Status:</h2>
            <div className="mt-2">
              <p className="text-sm text-gray-600">{status}</p>
              {error && (
                <p className="text-sm text-red-600 mt-1">Error: {error}</p>
              )}
            </div>
          </div>
          
          <div className="pt-4 border-t">
            <p className="text-xs text-gray-500">
              If everything shows ✅, your Supabase connection is working correctly!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 