import type { Client } from './types'

type ClientListProps = {
  clients: Client[]
}

export function ClientList({ clients }: ClientListProps) {
  return (
    <ul className="client-list">
      {clients.map((client) => (
        <li key={client.id} className="client-list-item">
          <p className="client-list-name">{client.name}</p>
          {client.phone ? (
            <p className="client-list-phone">{client.phone}</p>
          ) : null}
        </li>
      ))}
    </ul>
  )
}
