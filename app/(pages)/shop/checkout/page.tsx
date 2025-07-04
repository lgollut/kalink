import { getCheckoutSession } from '@/app/api/prismic/_services/stripe-checkout';
import { Box } from '@/components/box';
import { Container } from '@/components/container';

type CheckoutPageProps = Readonly<{
  searchParams: Promise<{ session_id: string }>;
}>;

export default async function Page({ searchParams }: CheckoutPageProps) {
  const sessionId = (await searchParams).session_id;

  const session = await getCheckoutSession(sessionId);

  console.log(session);

  return (
    <Container size="2xl">
      <Box>Checkout Page</Box>
    </Container>
  );
}
