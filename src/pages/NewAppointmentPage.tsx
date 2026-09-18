import { AppointmentForm } from '../features/appointments/AppointmentForm'
import type { Appointment } from '../features/appointments/types'

type NewAppointmentPageProps = {
  defaultDate: string
  onCancel: () => void
  onSaved: (appointment: Appointment) => void
}

export function NewAppointmentPage({
  defaultDate,
  onCancel,
  onSaved,
}: NewAppointmentPageProps) {
  return (
    <AppointmentForm
      defaultDate={defaultDate}
      onCancel={onCancel}
      onSaved={onSaved}
    />
  )
}
