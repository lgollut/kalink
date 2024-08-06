'use server';

import { Resend } from 'resend';

import { Message } from './Message';

export type SendFormData = {
  name: string;
  email: string;
  message: string;
  [key: string]: string;
};

export async function sendForm(formData: SendFormData) {
  const resend = new Resend(process.env.RESEND_KEY);

  return await resend.emails.send({
    from: 'info@kalink.ch',
    to: 'info@kalink.ch',
    subject: 'Contact depuis Kalink Studio',
    react: Message(formData),
  });
}
