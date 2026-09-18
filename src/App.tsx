import { useState } from 'react'
import { AppShell } from './app/layout/AppShell'
import type { AppScreen } from './app/layout/BottomNav'
import { AgendaPage } from './pages/AgendaPage'
import { ClientsPage } from './pages/ClientsPage'
import { NewAppointmentPage } from './pages/NewAppointmentPage'
import type { Appointment } from './features/appointments/types'
import { todayISODate } from './lib/dates'

type AppView = AppScreen | 'new-appointment'

function App() {
  const [view, setView] = useState<AppView>('agenda')
  const [selectedDate, setSelectedDate] = useState(todayISODate)

  const navScreen: AppScreen = view === 'clients' ? 'clients' : 'agenda'

  function handleSaved(appointment: Appointment) {
    setSelectedDate(appointment.date)
    setView('agenda')
  }

  return (
    <AppShell
      screen={navScreen}
      onNavigate={setView}
      showNav={view !== 'new-appointment'}
    >
      {view === 'clients' ? (
        <ClientsPage />
      ) : view === 'new-appointment' ? (
        <NewAppointmentPage
          defaultDate={selectedDate}
          onCancel={() => setView('agenda')}
          onSaved={handleSaved}
        />
      ) : (
        <AgendaPage
          selectedDate={selectedDate}
          onSelectedDateChange={setSelectedDate}
          onNewAppointment={() => setView('new-appointment')}
        />
      )}
    </AppShell>
  )
}

export default App
