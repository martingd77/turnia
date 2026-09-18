import { Button } from '../components/Button'
import { EmptyState } from '../components/EmptyState'
import { AppointmentCard } from '../features/appointments/AppointmentCard'
import { getAppointments } from '../features/appointments/api'
import { addDays, formatLongDate, todayISODate } from '../lib/dates'

type AgendaPageProps = {
  selectedDate: string
  onSelectedDateChange: (date: string) => void
  onNewAppointment: () => void
}

export function AgendaPage({
  selectedDate,
  onSelectedDateChange,
  onNewAppointment,
}: AgendaPageProps) {
  const today = todayISODate()
  const appointments = getAppointments().filter(
    (appointment) => appointment.date === selectedDate,
  )

  return (
    <section className="page">
      <h1 className="page-title">Agenda</h1>

      <div className="date-nav">
        <button
          type="button"
          className="date-nav-arrow"
          aria-label="Día anterior"
          onClick={() => onSelectedDateChange(addDays(selectedDate, -1))}
        >
          ‹
        </button>
        <p className="date-nav-label">{formatLongDate(selectedDate)}</p>
        <button
          type="button"
          className="date-nav-arrow"
          aria-label="Día siguiente"
          onClick={() => onSelectedDateChange(addDays(selectedDate, 1))}
        >
          ›
        </button>
      </div>

      <button
        type="button"
        className="today-button"
        disabled={selectedDate === today}
        onClick={() => onSelectedDateChange(today)}
      >
        Hoy
      </button>

      {appointments.length === 0 ? (
        <EmptyState
          title="No hay turnos este día"
          description="Cuando agendes un turno, va a aparecer acá."
        />
      ) : (
        <ul className="stack">
          {appointments.map((appointment) => (
            <li key={appointment.id}>
              <AppointmentCard appointment={appointment} />
            </li>
          ))}
        </ul>
      )}

      <div className="page-actions">
        <Button variant="primary" onClick={onNewAppointment}>
          Nuevo turno
        </Button>
      </div>
    </section>
  )
}
