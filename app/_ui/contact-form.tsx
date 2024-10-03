'use client';

import { isFilled } from '@prismicio/client';
import { useCallback, useTransition } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { sendForm, SendFormData } from '../_services/send-form';
import { ButtonLoading } from '@/components/button';
import { Select, SelectItem } from '@/components/select';
import { Stack } from '@/components/stack';
import { TextField } from '@/components/text-field';
import { Textarea } from '@/components/textarea';
import { useToast } from '@/components/toaster/use-toast';

import { ContactFormProps } from './contact-form.types';

const AllFields = {
  textField: TextField,
  select: Select,
  textarea: Textarea,
};

export const ContactForm = ({
  fields,
  tintScheme,
  type,
  ...props
}: ContactFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<SendFormData>();
  const addToast = useToast();

  const [isPending, startTransition] = useTransition();

  const onSubmit: SubmitHandler<SendFormData> = useCallback(
    (formData) => {
      startTransition(async () => {
        const { data, error } = await sendForm(formData, type);

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
    [reset, startTransition, addToast, type],
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} {...props} noValidate>
      <Stack gap="xl">
        <Stack use="label" gap="md">
          {fields.map(
            ({ fieldType, fieldName, fieldLabel, required, fieldMeta }) => {
              const Field = AllFields[fieldType];

              if (!Field || !fieldLabel || !fieldName) {
                return null;
              }

              if (
                fieldType === 'select' &&
                isFilled.contentRelationship(fieldMeta)
              ) {
                return (
                  <Controller
                    key={fieldName}
                    control={control}
                    name={fieldName}
                    rules={{
                      required: required
                        ? 'Merci de sélectionner une session'
                        : undefined,
                    }}
                    render={({ field, fieldState }) => (
                      <Field
                        name={fieldName}
                        label={fieldLabel}
                        required={required}
                        errors={fieldState.error?.message || ''}
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        {[
                          {
                            label: '1ère session : 09h00-10h30',
                            value: '09h00-10h30',
                          },
                          {
                            label: '2ème session : 11h00-12h30',
                            value: '11h00-12h30',
                          },
                          {
                            label: '3ème session : 13h00-14h30',
                            value: '13h00-14h30',
                          },
                          {
                            label: '4ème session : 15h00-16h30',
                            value: '15h00-16h30',
                          },
                        ].map(({ label, value }) => (
                          <SelectItem key={value} value={value}>
                            {label}
                          </SelectItem>
                        ))}
                      </Field>
                    )}
                  />
                );
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
            },
          )}
        </Stack>

        <ButtonLoading
          variant="filled"
          tintScheme={tintScheme}
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
