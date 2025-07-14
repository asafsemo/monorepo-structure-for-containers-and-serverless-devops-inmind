import { MainMenuLayout } from '@/layouts/main-menu.tsx'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/_layout')({
  component: AuthLayout,
})

function AuthLayout() {
  return (
    <MainMenuLayout></MainMenuLayout>
  )
}