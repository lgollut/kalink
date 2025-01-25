import { Box } from '@/components/box';
import { ButtonLink } from '@/components/button';
import { Container } from '@/components/container';
import { Stack } from '@/components/stack';
import { getServerTranslation } from '@/i18n';

export default async function NotFound() {
  const { t } = await getServerTranslation('fr', 'general');

  return (
    <Container size="2xl">
      <Stack gap="base">
        <Box textAlign="center">{t('notFound')}</Box>
        <ButtonLink
          href="/"
          tintScheme="primary"
          width="max-content"
          alignSelf="center"
        >
          {t('backToHomepage')}
        </ButtonLink>
      </Stack>
    </Container>
  );
}
