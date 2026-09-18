export const APPOINTMENT_STATUSES = [
  'PENDING',
  'RESERVED',
  'CONFIRMED',
  'COMPLETED',
  'CANCELLED',
  'NO_SHOW',
] as const

export type AppointmentStatus = (typeof APPOINTMENT_STATUSES)[number]

export const DEPOSIT_STATUSES = [
  'NOT_REQUIRED',
  'PENDING',
  'PROOF_RECEIVED',
  'VERIFIED',
  'REJECTED',
] as const

export type DepositStatus = (typeof DEPOSIT_STATUSES)[number]

export type Appointment = {
  id: string
  clientName: string
  clientPhone: string
  serviceName: string
  date: string
  startTime: string
  durationMinutes: number
  price: number
  depositAmount: number
  status: AppointmentStatus
  depositStatus: DepositStatus
  notes: string
  createdAt: string
  updatedAt: string
}

export type NewAppointmentInput = {
  clientName: string
  clientPhone: string
  serviceName: string
  date: string
  startTime: string
  durationMinutes: number
  price: number
  depositAmount: number
  notes: string
}
