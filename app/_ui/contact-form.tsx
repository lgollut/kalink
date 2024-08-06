'use client';

import { useCallback, useTransition } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { sendForm, SendFormData } from '../_services/send-form';
import { ButtonLoading } from '@/components/button';
import { Stack } from '@/components/stack';
import { TextField } from '@/components/text-field';
import { Textarea } from '@/components/textarea';
import { useToast } from '@/components/toaster/use-toast';

import { ContactFormProps } from './contact-form.types';

const AllFields = {
  textField: TextField,
  textarea: Textarea,
};

export const ContactForm = ({ fields, ...props }: ContactFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SendFormData>();
  const addToast = useToast();

  const [isPending, startTransition] = useTransition();

  const onSubmit: SubmitHandler<SendFormData> = useCallback(
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
    <form onSubmit={handleSubmit(onSubmit)} {...props} noValidate>
      <Stack gap="xl">
        <Stack use="label" gap="md">
          {fields.map(({ fieldType, fieldName, fieldLabel, required }) => {
            const Field = AllFields[fieldType];

            if (!Field || !fieldLabel || !fieldName) {
              return null;
            }

            return (
              <Field
                key={fieldName}
                label={fieldLabel}
                required={required}
                errors={errors[fieldName]?.message || ''}
                {...register(fieldName, {
                  required: required
                    ? 'Merci de renseigner ce champ'
                    : undefined,
                })}
              />
            );
          })}
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
