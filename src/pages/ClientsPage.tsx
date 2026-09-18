import { Button } from '../components/Button'
import { EmptyState } from '../components/EmptyState'
import { listClients } from '../features/clients/api'
import { ClientList } from '../features/clients/ClientList'

export function ClientsPage() {
  const clients = listClients()

  return (
    <section className="page">
      <h1 className="page-title">Clientes</h1>

      {clients.length === 0 ? (
        <EmptyState
          title="Todavía no hay clientes"
          description="Guardá a tus clientas y clientes para agendar más rápido."
        />
      ) : (
        <ClientList clients={clients} />
      )}

      <div className="page-actions">
        <Button variant="primary">Nuevo cliente</Button>
      </div>
    </section>
  )
}
