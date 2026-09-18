import { readJson, writeJson } from '../../lib/storage'
import type { Appointment, DepositStatus, NewAppointmentInput } from './types'

const STORAGE_KEY = 'appointments'

function nowIso(): string {
  return new Date().toISOString()
}

function createId(): string {
  return crypto.randomUUID()
}

function depositStatusFromAmount(amount: number): DepositStatus {
  return amount > 0 ? 'PENDING' : 'NOT_REQUIRED'
}

function sortAppointments(appointments: Appointment[]): Appointment[] {
  return [...appointments].sort((a, b) => {
    const byDate = a.date.localeCompare(b.date)
    if (byDate !== 0) {
      return byDate
    }
    return a.startTime.localeCompare(b.startTime)
  })
}

export function getAppointments(): Appointment[] {
  return sortAppointments(readJson<Appointment[]>(STORAGE_KEY, []))
}

function saveAppointments(appointments: Appointment[]): void {
  writeJson(STORAGE_KEY, appointments)
}

export function createAppointment(input: NewAppointmentInput): Appointment {
  const timestamp = nowIso()
  const appointment: Appointment = {
    ...input,
    id: createId(),
    status: 'PENDING',
    depositStatus: depositStatusFromAmount(input.depositAmount),
    createdAt: timestamp,
    updatedAt: timestamp,
  }

  saveAppointments([...getAppointments(), appointment])
  return appointment
}

export function updateAppointment(
  id: string,
  patch: Partial<Omit<Appointment, 'id' | 'createdAt'>>,
): Appointment {
  const appointments = getAppointments()
  const index = appointments.findIndex((appointment) => appointment.id === id)

  if (index === -1) {
    throw new Error('Turno no encontrado')
  }

  const updated: Appointment = {
    ...appointments[index],
    ...patch,
    id,
    createdAt: appointments[index].createdAt,
    updatedAt: nowIso(),
  }

  appointments[index] = updated
  saveAppointments(appointments)
  return updated
}

export function deleteAppointment(id: string): void {
  saveAppointments(
    getAppointments().filter((appointment) => appointment.id !== id),
  )
}
