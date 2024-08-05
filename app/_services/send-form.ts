'use server';

type SendFormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export async function sendForm({
  name,
  email,
  subject,
  message,
}: SendFormData): Promise<{ data: any; error: any }> {
  // const resend = new Resend(process.env.RESEND_KEY);

  // return await resend.emails.send({
  //   from: 'info@stephaniegiorgis.ch',
  //   to: 'info@stephaniegiorgis.ch',
  //   subject,
  //   react: Message({ name, email, subject, message }),
  // });

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: null, error: { message: 'Not implemented' } });
    }, 2000);
  });
}
