import { Outlet } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

export function MainMenuLayout() {
  const { t } = useTranslation()
  
  return (
    <div>
      <h1>{t('pages.auth.layout.title')}2222222</h1>
      <Outlet />
    </div>
  )
}