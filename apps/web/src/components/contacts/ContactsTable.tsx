'use client';

import { useEffect, useState, useTransition } from 'react';

import { deleteContact, getContacts, verifyContact } from '@/lib/api';
import type { Contact } from '@/types/contact';
import { Button } from '@/components/ui/button';

export function ContactsTable() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    void loadContacts();
  }, []);

  async function loadContacts() {
    try {
      setError(null);
      setContacts(await getContacts());
    } catch {
      setError('Unable to load contacts.');
    }
  }

  function handleVerify(id: string) {
    startTransition(() => {
      void verifyContact(id)
        .then(loadContacts)
        .catch(() => setError('Unable to verify contact.'));
    });
  }

  function handleDelete(id: string) {
    startTransition(() => {
      void deleteContact(id)
        .then(loadContacts)
        .catch(() => setError('Unable to delete contact.'));
    });
  }

  return (
    <section className="surface" style={{ borderRadius: 32, padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <p style={{ color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Contacts</p>
          <h1 style={{ margin: '0.5rem 0 0' }}>Verify or remove submissions.</h1>
        </div>
        <Button onClick={() => void loadContacts()} type="button" variant="secondary">
          Refresh
        </Button>
      </div>
      {error ? <p style={{ color: '#9f2d18' }}>{error}</p> : null}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--border)' }}>
              <th style={{ padding: '0.75rem 0.5rem' }}>Name</th>
              <th style={{ padding: '0.75rem 0.5rem' }}>Email</th>
              <th style={{ padding: '0.75rem 0.5rem' }}>Status</th>
              <th style={{ padding: '0.75rem 0.5rem' }}>Message</th>
              <th style={{ padding: '0.75rem 0.5rem' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact.id} style={{ borderBottom: '1px solid var(--border)', verticalAlign: 'top' }}>
                <td style={{ padding: '0.9rem 0.5rem' }}>{`${contact.firstName} ${contact.lastName}`}</td>
                <td style={{ padding: '0.9rem 0.5rem' }}>{contact.email}</td>
                <td style={{ padding: '0.9rem 0.5rem', color: contact.verified ? 'var(--success)' : 'var(--muted)' }}>
                  {contact.verified ? 'Verified' : 'Pending'}
                </td>
                <td style={{ padding: '0.9rem 0.5rem', minWidth: 280 }}>{contact.message}</td>
                <td style={{ padding: '0.9rem 0.5rem' }}>
                  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <Button disabled={contact.verified || isPending} onClick={() => handleVerify(contact.id)} type="button">
                      Verify
                    </Button>
                    <Button disabled={isPending} onClick={() => handleDelete(contact.id)} type="button" variant="ghost">
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