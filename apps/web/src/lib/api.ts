import type { Contact, CreateContactDto } from '@/types/contact';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...init,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message ?? `API error ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export function createContact(dto: CreateContactDto): Promise<Contact> {
  return request<Contact>('/api/contacts', {
    method: 'POST',
    body: JSON.stringify(dto),
  });
}

export function getContacts(): Promise<Contact[]> {
  return request<Contact[]>('/api/contacts');
}

export function markVerified(id: string): Promise<Contact> {
  return request<Contact>(`/api/contacts/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ verified: true }),
  });
}

export function deleteContact(id: string): Promise<Contact> {
  return request<Contact>(`/api/contacts/${id}`, { method: 'DELETE' });
}
