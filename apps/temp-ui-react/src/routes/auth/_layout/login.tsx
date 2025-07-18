import { createFileRoute } from '@tanstack/react-router'
import { LoginForm } from '@/features/authentication'

export const Route = createFileRoute('/auth/_layout/login')({
  component: Login,
})

function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <LoginForm />
      </div>
    </div>
  )
} 