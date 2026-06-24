import type { Contact } from '@/types/contact';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers || {}),
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export function createContact(payload: Omit<Contact, 'id' | 'verified' | 'createdAt'>) {
  return request<Contact>('/contacts', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function getContacts() {
  return request<Contact[]>('/contacts');
}

export function verifyContact(id: string) {
  return request<Contact>(`/contacts/${id}/verify`, {
    method: 'PATCH',
  });
}

export function deleteContact(id: string) {
  return request<Contact>(`/contacts/${id}`, {
    method: 'DELETE',
  });
}