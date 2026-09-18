export type AppScreen = 'agenda' | 'clients'

type BottomNavProps = {
  screen: AppScreen
  onNavigate: (screen: AppScreen) => void
}

export function BottomNav({ screen, onNavigate }: BottomNavProps) {
  return (
    <nav className="bottom-nav" aria-label="Navegación principal">
      <button
        type="button"
        className={screen === 'agenda' ? 'nav-item is-active' : 'nav-item'}
        aria-current={screen === 'agenda' ? 'page' : undefined}
        onClick={() => onNavigate('agenda')}
      >
        Agenda
      </button>
      <button
        type="button"
        className={screen === 'clients' ? 'nav-item is-active' : 'nav-item'}
        aria-current={screen === 'clients' ? 'page' : undefined}
        onClick={() => onNavigate('clients')}
      >
        Clientes
      </button>
    </nav>
  )
}
