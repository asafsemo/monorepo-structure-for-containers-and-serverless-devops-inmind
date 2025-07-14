# Authentication Feature

This feature provides authentication functionality for the React application, converted from the Vue implementation.

## Files Created

### Components
- `components/LoginForm.tsx` - Main login form component with email/password inputs and social login buttons

### Services
- `services.ts` - Authentication service functions for login/logout API calls (tree-shakeable)

### Types
- `types.ts` - TypeScript interfaces for authentication-related types

### State Management
- `../stores/authAtom.ts` - Jotai atoms for authentication state management

### Pages
- `../pages/Login.tsx` - Login page component using the LoginForm

## Features

- ✅ Email/password authentication with form validation using React Hook Form + Zod
- ✅ Loading states and error handling
- ✅ Social login buttons (Facebook, Google, Apple) - UI only
- ✅ Internationalization support using react-i18next
- ✅ Responsive design with Tailwind CSS
- ✅ Accessibility features (ARIA labels, keyboard navigation)
- ✅ Test-friendly with data-testid attributes
- ✅ Redirect functionality after successful login

## Usage

```tsx
import { LoginForm } from '@/features/authentication'

// Basic usage
<LoginForm />

// With redirect
<LoginForm redirectTo="/dashboard" />
```

## State Management

The authentication state is managed using Jotai atoms:

```tsx
import { useAtomValue } from 'jotai'
import { $userAtom, $isAuthenticatedAtom } from '@/stores/authAtom'

const user = useAtomValue($userAtom)
const isAuthenticated = useAtomValue($isAuthenticatedAtom)
```

## Direct Service Usage

You can also use the authentication functions directly for better tree-shaking:

```tsx
import { authLogin, authLogout } from '@/features/authentication'

// Login
const handleLogin = async (credentials: ILoginCredentials) => {
  try {
    const user = await authLogin(credentials)
    console.log('User logged in:', user)
  } catch (error) {
    console.error('Login failed:', error)
  }
}

// Logout
const handleLogout = async () => {
  try {
    await authLogout()
    console.log('User logged out')
  } catch (error) {
    console.error('Logout failed:', error)
  }
}

## Dependencies Required

Make sure these dependencies are installed:
- `jotai` - State management
- `react-hook-form` - Form handling
- `@hookform/resolvers/zod` - Form validation
- `zod` - Schema validation
- `react-i18next` - Internationalization
- `@tanstack/react-router` - Routing

## Translation Keys

The component uses the following translation keys:
- `features.authentication.loginForm.title`
- `features.authentication.loginForm.subtitle`
- `features.authentication.loginForm.emailLabel`
- `features.authentication.loginForm.emailPlaceholder`
- `features.authentication.loginForm.passwordLabel`
- `features.authentication.loginForm.passwordPlaceholder`
- `features.authentication.loginForm.submitButton`
- `features.authentication.loginForm.or`
- `features.authentication.loginForm.noAccount`
- `features.authentication.loginForm.signupLink`
- `common.messages.loading` 