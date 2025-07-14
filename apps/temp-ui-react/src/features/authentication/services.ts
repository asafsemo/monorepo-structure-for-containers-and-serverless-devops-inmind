import { atom, getDefaultStore } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import type { LoginCredentials, User } from './types'

// Base atoms
export const $userAtom = atomWithStorage<User | null>('auth-user', null)
export const $loadingAtom = atom<boolean>(false)
export const $loginAtom = atom<boolean>(false)
export const $errorAtom = atom<string | null>(null)

// Derived atoms
export const $isAuthenticatedAtom = atom((get: (atom: any) => any) => get($userAtom) !== null)

// Get the Jotai store instance
const store = getDefaultStore()

export const authLogin = async (credentials: LoginCredentials): Promise<User> => {
  // Set loading state
  store.set($loadingAtom, true)
  store.set($errorAtom, null)

  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    })
    
    if (!response.ok) {
      const error = await response.json()
      const errorMessage = error.message || `Login failed: ${response.statusText}`
      store.set($errorAtom, errorMessage)
      throw new Error(errorMessage)
    }
    
    const userData = await response.json()
    
    // Set user data on success
    store.set($userAtom, userData)
    store.set($loadingAtom, false)
    
    return userData
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred'
    store.set($errorAtom, errorMessage)
    store.set($loadingAtom, false)
    console.error('Error during login:', error)
    throw error
  }
}

export const authLogout = async (): Promise<void> => {
  // Set loading state
  store.set($loadingAtom, true)
  store.set($errorAtom, null)

  try {
    await fetch('/api/auth/logout', { method: 'POST' })
    
    // Clear user data on successful logout
    store.set($userAtom, null)
    store.set($loadingAtom, false)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Logout failed'
    store.set($errorAtom, errorMessage)
    store.set($loadingAtom, false)
    console.error('Error during logout:', error)
    throw error
  }
}

export const clearAuthError = (): void => {
  store.set($errorAtom, null)
}

export const setAuthLoading = (loading: boolean): void => {
  store.set($loadingAtom, loading)
}

// Service object for consistent API
export const serviceAuth = {
  login: authLogin,
  logout: authLogout,
  clearError: clearAuthError,
  setLoading: setAuthLoading
} 