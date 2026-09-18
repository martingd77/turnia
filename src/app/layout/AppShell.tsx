import type { ReactNode } from 'react'
import { BottomNav, type AppScreen } from './BottomNav'

type AppShellProps = {
  screen: AppScreen
  onNavigate: (screen: AppScreen) => void
  showNav?: boolean
  children: ReactNode
}

export function AppShell({
  screen,
  onNavigate,
  showNav = true,
  children,
}: AppShellProps) {
  return (
    <div className="app-shell">
      <header className="app-header">
        <p className="app-brand">Turnia</p>
      </header>
      <main className="app-main">{children}</main>
      {showNav ? <BottomNav screen={screen} onNavigate={onNavigate} /> : null}
    </div>
  )
}
