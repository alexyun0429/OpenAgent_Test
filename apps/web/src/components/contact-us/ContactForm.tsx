'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { createContact } from '@/lib/api';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const formSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Valid email address is required'),
  phone: z.string().regex(/^(\+?61|0)[2-9]\d{8}$/, 'Must be a valid Australian phone number'),
  note: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function ContactForm() {
  const router = useRouter();
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      note: '',
    },
  });

  async function onSubmit(values: FormValues) {
    setSubmissionError(null);

    try {
      await createContact(values);
      router.push(`/thank-you?name=${encodeURIComponent(values.firstName)}`);
    } catch {
      setSubmissionError('Unable to submit the form right now.');
    }
  }

  return (
    <section
      style={{
        borderRadius: 16,
        padding: '2rem',
        background: '#f3f5f4',
        border: '1px solid var(--border)',
      }}
    >
      <p style={{ color: 'var(--muted)', margin: '0 0 1.5rem', lineHeight: 1.6 }}>
        Fill in your details and we&apos;ll be in touch right away. Or if you prefer, call us on{' '}
        <strong style={{ color: 'var(--foreground)' }}>13 24 34</strong>
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} style={{ display: 'grid', gap: '1rem' }}>
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="First name" aria-label="First name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Last name" aria-label="Last name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Email address" type="email" aria-label="Email address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Phone number" type="tel" aria-label="Phone number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="note"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="What do you want to speak to us about"
                    aria-label="What do you want to speak to us about"
                    rows={6}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {submissionError ? <p style={{ color: '#9f2d18' }}>{submissionError}</p> : null}
          <Button
            disabled={form.formState.isSubmitting}
            type="submit"
            style={{ width: '100%', borderRadius: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}
          >
            {form.formState.isSubmitting ? 'Sending...' : 'Send message'}
          </Button>
          <p style={{ fontSize: '0.8rem', color: 'var(--muted)', margin: 0, lineHeight: 1.5 }}>
            By sending a message you agree to the{' '}
            <a href="#" style={{ color: 'var(--accent)' }}>
              Terms and Condition
            </a>{' '}
            and{' '}
            <a href="#" style={{ color: 'var(--accent)' }}>
              Privacy Policy
            </a>
          </p>
        </form>
      </Form>
    </section>
  );
}
