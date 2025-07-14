import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/_route')({
  component: AppLayoutComponent,
})

function AppLayoutComponent() {
  return (
    <div>
      <h1>Auth Layout</h1>
      <Outlet />
    </div>
  )
}