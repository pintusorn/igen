'use client'

import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

interface User {
  user_id: string
  username: string
  email: string
  firstname: string
  lastname: string
  nickname: string
  dob: string
  gender: string
  home_country: string
  nationality: string
  telephone: string
  religious: string
  current_country: string
  current_city: string
  student_status: string
  university?: string
  study_year?: string
  degree?: string
  faculty?: string
  major?: string
  occupation?: string
  interest: string
  igen_club: string
  profile_image_url: string
  current_score: number
  role: string
  is_active: boolean
  last_login?: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (emailOrUsername: string, password: string) => Promise<void>
  logout: () => void
  updateUser: (userData: Partial<User>) => Promise<void>
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  // Session management functions
  const setSession = useCallback((userData: User) => {
    // Store user data with timestamp
    const sessionData = {
      user: userData,
      timestamp: Date.now(),
      sessionId: generateSessionId()
    }
    localStorage.setItem('auth_session', JSON.stringify(sessionData))
    setUser(userData)
  }, [])

  const clearSession = useCallback(() => {
    localStorage.removeItem('auth_session')
    setUser(null)
  }, [])

  const generateSessionId = () => {
    return Math.random().toString(36).substring(2) + Date.now().toString(36)
  }

  const validateSession = (sessionData: unknown): boolean => {
    if (!sessionData || typeof sessionData !== 'object' || !sessionData || !('user' in sessionData) || !('timestamp' in sessionData)) {
      return false
    }

    const session = sessionData as { user: User; timestamp: number }

    // Check if session is expired (24 hours)
    const sessionAge = Date.now() - session.timestamp
    const maxSessionAge = 24 * 60 * 60 * 1000 // 24 hours in milliseconds

    if (sessionAge > maxSessionAge) {
      return false
    }

    // Validate user data structure
    const requiredFields: (keyof User)[] = ['user_id', 'email', 'username', 'role']
    return requiredFields.every(field => session.user[field])
  }

  // Initialize session on app load
  useEffect(() => {
    const initializeSession = () => {
      try {
        const sessionData = localStorage.getItem('auth_session')
        if (sessionData) {
          const parsed = JSON.parse(sessionData)
          if (validateSession(parsed)) {
            setUser(parsed.user)
          } else {
            // Session is invalid, clear it
            clearSession()
          }
        }
      } catch (error) {
        console.error('Error initializing session:', error)
        clearSession()
      } finally {
        setLoading(false)
      }
    }

    initializeSession()
  }, [clearSession])

  // Login function with lazy bcrypt loading
  const login = useCallback(async (emailOrUsername: string, password: string) => {
    try {
      setLoading(true)
      
      // Check if input is email or username
      const isEmail = emailOrUsername.includes('@')
      
      // Fetch user by email or username
      const { data: userData, error } = await supabase
        .from('users')
        .select('*')
        .eq(isEmail ? 'email' : 'username', emailOrUsername)
        .single()

      if (error || !userData) {
        throw new Error('Invalid email/username or password')
      }

      // Lazy load bcrypt only when needed
      const bcrypt = (await import('bcryptjs')).default
      const isMatch = await bcrypt.compare(password, userData.password)
      if (!isMatch) {
        throw new Error('Invalid email/username or password')
      }

      // Check if user is active
      if (!userData.is_active) {
        throw new Error('Account is deactivated. Please contact support.')
      }

      // Update last login
      await supabase
        .from('users')
        .update({ last_login: new Date().toISOString() })
        .eq('user_id', userData.user_id)

      // Set session
      setSession(userData)

      // Redirect based on role
      if (userData.role === 'admin') {
        router.push('/admin/profile')
      } else {
        router.push('/member/profile')
      }

    } catch (error: unknown) {
      throw new Error(error instanceof Error ? error.message : 'Login failed')
    } finally {
      setLoading(false)
    }
  }, [supabase, setSession, router])

  // Logout function
  const logout = useCallback(() => {
    clearSession()
    router.push('/')
  }, [clearSession, router])

  // Update user data
  const updateUser = useCallback(async (userData: Partial<User>) => {
    if (!user) return

    try {
      const { error } = await supabase
        .from('users')
        .update(userData)
        .eq('user_id', user.user_id)
        .select()
        .single()

      if (error) {
        throw new Error(error.message)
      }

      // Update session with new user data
      const updatedUser = { ...user, ...userData }
      setSession(updatedUser)

    } catch (error: unknown) {
      throw new Error(error instanceof Error ? error.message : 'Failed to update user')
    }
  }, [user, supabase, setSession])

  const value = {
    user,
    loading,
    login,
    logout,
    updateUser,
    isAuthenticated: !!user
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 