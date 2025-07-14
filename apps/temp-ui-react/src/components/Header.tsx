import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

export default function Header() {
  const { t } = useTranslation()
  
  return (
    <header className="p-2 flex gap-2 bg-white text-black justify-between">
      <nav className="flex flex-row">
        <div className="px-2 font-bold">
          <Link to="/">{t('components.header.navigation.home')}</Link>
        </div>

        <div className="px-2 font-bold">
          <Link to="/demo/tanstack-query">{t('components.header.navigation.tanstackQuery')}</Link>
        </div>
      </nav>
    </header>
  )
}
