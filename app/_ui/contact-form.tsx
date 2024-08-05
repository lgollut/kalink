'use client';

import { ComponentPropsWithoutRef, useCallback, useTransition } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { sendForm } from '../_services/send-form';
import { ButtonLoading } from '@/components/button';
import { Stack } from '@/components/stack';
import { TextField } from '@/components/text-field';
import { Textarea } from '@/components/textarea/textarea';
import { useToast } from '@/components/toaster/use-toast';

import { MessageInputs } from './contact-form.types';

export const ContactForm = (props: ComponentPropsWithoutRef<'form'>) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MessageInputs>();
  const addToast = useToast();

  const [isPending, startTransition] = useTransition();

  const onSubmit: SubmitHandler<MessageInputs> = useCallback(
    (formData) => {
      startTransition(async () => {
        const { data, error } = await sendForm(formData);

        if (error || !data) {
          addToast({
            title: 'Erreur',
            description:
              error?.message || "Une erreur inattendue s'est produite",
            tintScheme: 'error',
          });

          return;
        }

        addToast({
          title: 'Succès',
          description: 'Votre message a bien été envoyé',
          tintScheme: 'primary',
        });

        reset();
      });
    },
    [reset, startTransition, addToast],
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} {...props}>
      <Stack gap="xl">
        <Stack use="label" gap="md">
          <TextField
            label="Votre nom"
            errors={errors.name?.message || ''}
            {...register('name', { required: 'Merci de renseigner votre nom' })}
          />
          <TextField
            type="email"
            label="Votre email"
            errors={errors.email?.message || ''}
            {...register('email', {
              required: 'Merci de renseigner votre email',
            })}
          />
          <Textarea
            label="Votre Message"
            errors={errors.message?.message || ''}
            {...register('message', {
              required: 'Le message ne peut pas être vide',
            })}
          />
        </Stack>

        <ButtonLoading
          variant="outlined"
          tintScheme="secondary"
          type="submit"
          loading={isPending}
          alignSelf="flex-start"
        >
          {'Envoyer'}
        </ButtonLoading>
      </Stack>
    </form>
  );
};
