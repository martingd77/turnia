import { APPOINTMENT_STATUS_LABELS, DEPOSIT_STATUS_LABELS } from './labels'
import type { Appointment } from './types'

const priceFormatter = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
})

type AppointmentCardProps = {
  appointment: Appointment
}

export function AppointmentCard({ appointment }: AppointmentCardProps) {
  const showDeposit = appointment.depositStatus !== 'NOT_REQUIRED'

  return (
    <article className="appointment-card">
      <div className="appointment-card-time">{appointment.startTime}</div>
      <div className="appointment-card-body">
        <div className="appointment-card-top">
          <p className="appointment-card-title">{appointment.clientName}</p>
          <span className={`status-pill status-${appointment.status}`}>
            {APPOINTMENT_STATUS_LABELS[appointment.status]}
          </span>
        </div>
        <p className="appointment-card-service">{appointment.serviceName}</p>
        <p className="appointment-card-price">
          {priceFormatter.format(appointment.price)}
        </p>
        {showDeposit ? (
          <p className={`deposit-pill deposit-${appointment.depositStatus}`}>
            {DEPOSIT_STATUS_LABELS[appointment.depositStatus]}
            {appointment.depositAmount > 0
              ? ` · ${priceFormatter.format(appointment.depositAmount)}`
              : ''}
          </p>
        ) : null}
      </div>
    </article>
  )
}
