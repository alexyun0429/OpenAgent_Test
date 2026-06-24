'use client';

import { useEffect, useState } from 'react';

import { deleteContact, getContacts, markVerified } from '@/lib/api';
import type { Contact } from '@/types/contact';
import { Button } from '@/components/ui/button';

export function ContactsTable() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getContacts()
      .then(setContacts)
      .catch(() => setError('Unable to load contacts.'))
      .finally(() => setLoading(false));
  }, []);

  async function handleVerify(id: string) {
    const snapshot = contacts;
    setContacts((prev) => prev.map((c) => (c.id === id ? { ...c, verified: true } : c)));
    try {
      await markVerified(id);
    } catch {
      setContacts(snapshot);
    }
  }

  async function handleDelete(id: string) {
    const snapshot = contacts;
    setContacts((prev) => prev.filter((c) => c.id !== id));
    try {
      await deleteContact(id);
    } catch {
      setContacts(snapshot);
    }
  }

  if (loading) {
    return <p style={{ color: 'var(--muted)', padding: '2rem', textAlign: 'center' }}>Loading contacts…</p>;
  }

  if (error) {
    return <p style={{ color: '#9f2d18', padding: '2rem', textAlign: 'center' }}>{error}</p>;
  }

  if (contacts.length === 0) {
    return <p style={{ color: 'var(--muted)', padding: '2rem', textAlign: 'center' }}>No contacts yet.</p>;
  }

  return (
    <section className="surface" style={{ borderRadius: 32, padding: '2rem' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <p style={{ color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Contacts</p>
        <h1 style={{ margin: '0.5rem 0 0' }}>Verify or remove submissions.</h1>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--border)' }}>
              <th style={{ padding: '0.75rem 0.5rem' }}>Name</th>
              <th style={{ padding: '0.75rem 0.5rem' }}>Email</th>
              <th style={{ padding: '0.75rem 0.5rem' }}>Phone</th>
              <th style={{ padding: '0.75rem 0.5rem' }}>Status</th>
              <th style={{ padding: '0.75rem 0.5rem' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact.id} style={{ borderBottom: '1px solid var(--border)', verticalAlign: 'top' }}>
                <td style={{ padding: '0.9rem 0.5rem' }}>{contact.firstName} {contact.lastName}</td>
                <td style={{ padding: '0.9rem 0.5rem' }}>{contact.email}</td>
                <td style={{ padding: '0.9rem 0.5rem' }}>{contact.phone}</td>
                <td style={{ padding: '0.9rem 0.5rem', color: contact.verified ? 'var(--success)' : 'var(--muted)' }}>
                  {contact.verified ? 'Verified' : 'Pending'}
                </td>
                <td style={{ padding: '0.9rem 0.5rem' }}>
                  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <Button disabled={contact.verified} onClick={() => handleVerify(contact.id)} type="button">
                      Verify
                    </Button>
                    <Button onClick={() => handleDelete(contact.id)} type="button" variant="ghost">
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
