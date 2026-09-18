import type { AppointmentStatus, DepositStatus } from './types'

export const APPOINTMENT_STATUS_LABELS: Record<AppointmentStatus, string> = {
  PENDING: 'Pendiente',
  RESERVED: 'Reservado',
  CONFIRMED: 'Confirmado',
  COMPLETED: 'Completado',
  CANCELLED: 'Cancelado',
  NO_SHOW: 'No vino',
}

export const DEPOSIT_STATUS_LABELS: Record<DepositStatus, string> = {
  NOT_REQUIRED: 'Sin seña',
  PENDING: 'Seña pendiente',
  PROOF_RECEIVED: 'Comprobante recibido',
  VERIFIED: 'Seña verificada',
  REJECTED: 'Seña rechazada',
}
