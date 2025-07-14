import { Outlet, createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/auth/_layout')({
  component: AppLayoutComponent,
})

function AppLayoutComponent() {
  const { t } = useTranslation()
  
  return (
    <div>
      <h1>{t('pages.auth.layout.title')}</h1>
      <Outlet />
    </div>
  )
}