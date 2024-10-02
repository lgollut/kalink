'use server';

import { Resend } from 'resend';

import { Inscription } from './Inscription';
import { Message } from './Message';

export type SendFormData = {
  name: string;
  email: string;
  message: string;
  [key: string]: string;
};

export async function sendForm(
  formData: SendFormData,
  type: 'message' | 'inscription',
) {
  const resend = new Resend(process.env.RESEND_KEY);

  return await resend.emails.send({
    from: 'info@kalink.ch',
    to: 'info@kalink.ch',
    subject: `${type.charAt(0).toUpperCase() + type.slice(1)} depuis Kalink Studio`,
    react: type === 'message' ? Message(formData) : Inscription(formData),
  });
}
