import { useState, type FormEvent } from 'react'
import { Button } from '../../components/Button'
import { DURATION_OPTIONS, EXAMPLE_SERVICES } from './constants'
import { createAppointment } from './api'
import type { Appointment } from './types'

type AppointmentFormProps = {
  defaultDate: string
  onCancel: () => void
  onSaved: (appointment: Appointment) => void
}

function parseAmount(value: string): number {
  const normalized = value.trim().replace(',', '.')
  if (normalized === '') {
    return 0
  }
  return Number(normalized)
}

export function AppointmentForm({
  defaultDate,
  onCancel,
  onSaved,
}: AppointmentFormProps) {
  const [clientName, setClientName] = useState('')
  const [clientPhone, setClientPhone] = useState('')
  const [serviceName, setServiceName] = useState('')
  const [date, setDate] = useState(defaultDate)
  const [startTime, setStartTime] = useState('')
  const [durationMinutes, setDurationMinutes] = useState('60')
  const [price, setPrice] = useState('')
  const [depositAmount, setDepositAmount] = useState('')
  const [notes, setNotes] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const duration = Number(durationMinutes)
    const parsedPrice = parseAmount(price)
    const parsedDeposit = parseAmount(depositAmount)

    if (!clientName.trim()) {
      setError('El nombre de la clienta o cliente es obligatorio.')
      return
    }
    if (!serviceName) {
      setError('Elegí un servicio.')
      return
    }
    if (!date) {
      setError('Elegí una fecha.')
      return
    }
    if (!startTime) {
      setError('Elegí un horario.')
      return
    }
    if (!(DURATION_OPTIONS as readonly number[]).includes(duration)) {
      setError('Elegí una duración válida.')
      return
    }
    if (Number.isNaN(parsedPrice) || parsedPrice < 0) {
      setError('El precio no puede ser negativo.')
      return
    }
    if (Number.isNaN(parsedDeposit) || parsedDeposit < 0) {
      setError('La seña no puede ser negativa.')
      return
    }
    if (parsedDeposit > parsedPrice) {
      setError('La seña no puede ser mayor que el precio.')
      return
    }

    const appointment = createAppointment({
      clientName: clientName.trim(),
      clientPhone: clientPhone.trim(),
      serviceName,
      date,
      startTime,
      durationMinutes: duration,
      price: parsedPrice,
      depositAmount: parsedDeposit,
      notes: notes.trim(),
    })

    onSaved(appointment)
  }

  return (
    <form className="page appointment-form" onSubmit={handleSubmit} noValidate>
      <h1 className="page-title">Nuevo turno</h1>

      {error ? <p className="form-error">{error}</p> : null}

      <label className="field">
        <span>Cliente</span>
        <input
          type="text"
          name="clientName"
          autoComplete="name"
          value={clientName}
          onChange={(event) => setClientName(event.target.value)}
          required
        />
      </label>

      <label className="field">
        <span>Teléfono</span>
        <input
          type="tel"
          name="clientPhone"
          autoComplete="tel"
          inputMode="tel"
          value={clientPhone}
          onChange={(event) => setClientPhone(event.target.value)}
        />
      </label>

      <label className="field">
        <span>Servicio</span>
        <select
          name="serviceName"
          value={serviceName}
          onChange={(event) => setServiceName(event.target.value)}
          required
        >
          <option value="">Elegí un servicio</option>
          {EXAMPLE_SERVICES.map((service) => (
            <option key={service} value={service}>
              {service}
            </option>
          ))}
        </select>
      </label>

      <div className="field-row">
        <label className="field">
          <span>Fecha</span>
          <input
            type="date"
            name="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            required
          />
        </label>
        <label className="field">
          <span>Hora</span>
          <input
            type="time"
            name="startTime"
            value={startTime}
            onChange={(event) => setStartTime(event.target.value)}
            required
          />
        </label>
      </div>

      <label className="field">
        <span>Duración</span>
        <select
          name="durationMinutes"
          value={durationMinutes}
          onChange={(event) => setDurationMinutes(event.target.value)}
        >
          {DURATION_OPTIONS.map((minutes) => (
            <option key={minutes} value={minutes}>
              {minutes} min
            </option>
          ))}
        </select>
      </label>

      <div className="field-row">
        <label className="field">
          <span>Precio</span>
          <input
            type="number"
            name="price"
            inputMode="decimal"
            min="0"
            step="0.01"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
          />
        </label>
        <label className="field">
          <span>Seña</span>
          <input
            type="number"
            name="depositAmount"
            inputMode="decimal"
            min="0"
            step="0.01"
            value={depositAmount}
            onChange={(event) => setDepositAmount(event.target.value)}
          />
        </label>
      </div>

      <label className="field">
        <span>Notas</span>
        <textarea
          name="notes"
          rows={3}
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
        />
      </label>

      <div className="page-actions form-actions">
        <Button type="submit" variant="primary">
          Guardar
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
      </div>
    </form>
  )
}
