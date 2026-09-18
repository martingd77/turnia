import { readJson } from '../../lib/storage'
import type { Client } from './types'

const STORAGE_KEY = 'clients'

export function listClients(): Client[] {
  return readJson<Client[]>(STORAGE_KEY, [])
}
