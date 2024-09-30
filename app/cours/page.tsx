import Image from 'next/image';
import Link from 'next/link';
import { forwardRef } from 'react';

import { Container } from '@/components/container';
import { Footer } from '@/components/footer';
import { Heading } from '@/components/heading';
import { Stack } from '@/components/stack';
import { Text } from '@/components/text';

export default function CoursesPage() {
  return (
    <Stack gap="none" alignItems="center" style={{ minBlockSize: '100svh' }}>
      <Container size="md" display="flex" justifyContent="center">
        <Image src="/kalink.svg" alt="KalinK Studio" width={300} height={200} />
      </Container>
      <Stack gap="4xl" alignItems="center" width="full" flexGrow={1}>
        <Container
          size="md"
          display="flex"
          flexDirection="column"
          gap="3xl"
          alignItems="center"
        >
          <Heading
            use="h1"
            typography="headlineLarge"
            textAlign="center"
            paddingBlock="xl"
            paddingInline="3xl"
            tintScheme="secondaryContainer"
            borderRadius="default"
            maxInlineSize="lg"
          >
            Les informations sur nos cours seront bientôt disponibles.
          </Heading>
          <Stack gap="base" alignItems="center">
            <Link href="/#contact">
              <Text color="onSurface" textDecoration="underline">
                Contactez nous via le formulaire
              </Text>
            </Link>
            <Link
              href="https://kalink.cdn.prismic.io/kalink/ZvsQJ7VsGrYSwLB6_Cours_Dossier_exemples.pdf"
              target="_blank"
            >
              <Text color="onSurface" textDecoration="underline">
                Télécharger le dossier d´exemples
              </Text>
            </Link>
          </Stack>
        </Container>
        <Footer marginBlockStart="auto" alignSelf="stretch" />
      </Stack>
    </Stack>
  );
}

const WrappedCoursesPage = forwardRef(CoursesPage);

export { WrappedCoursesPage as CoursesPage };
