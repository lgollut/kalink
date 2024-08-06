import { Root } from '@radix-ui/react-toast';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { clsx } from 'clsx';
import { cubicBezier } from 'framer-motion';
import {
  ForwardedRef,
  forwardRef,
  useCallback,
  useMemo,
  useState,
} from 'react';

import { AnimatedBox } from '../box';
import { Cluster } from '@/components/cluster';
import { Stack } from '@/components/stack';
import { ToastAction } from '@/components/toaster/toast-action';
import { durationVar, toast } from '@/components/toaster/toast.css';
import { cubicBezier as cubicBezierDefinition } from '@/styles/ref.css';
import { UnconditionalProperties } from '@/styles/sprinkles.css';

import { ToastClose } from './toast-close';
import { ToastDescription } from './toast-description';
import { ToastTitle } from './toast-title';
import { ToastProps } from './toast.types';
import { useToasterContext } from './toaster-context';

// TODO resolve dismiss duration issue -> https://github.com/radix-ui/primitives/issues/2233
const Toast = (
  {
    id,
    className,
    children,
    title,
    description,
    action,
    tintScheme = 'secondary',
    duration,
    ...props
  }: ToastProps,
  ref: ForwardedRef<any>,
) => {
  const [running, setRunning] = useState(true);
  const { defaultDuration } = useToasterContext();

  const onPause = useCallback(() => {
    setRunning(false);
  }, [setRunning]);

  const onResume = useCallback(() => {
    setRunning(true);
  }, [setRunning]);

  const durationValue = useMemo(() => {
    return duration ?? defaultDuration;
  }, [duration, defaultDuration]);

  const actionsTintScheme = useMemo(() => {
    const tintSchemeMap = {
      primary: 'primaryInverted',
      secondary: 'secondaryInverted',
      error: 'errorInverted',
    };

    return tintSchemeMap[tintScheme] as UnconditionalProperties['tintScheme'];
  }, [tintScheme]);

  return (
    <Root
      ref={ref}
      onPause={onPause}
      onResume={onResume}
      duration={durationValue}
      asChild
      forceMount
      {...props}
    >
      <AnimatedBox
        use="li"
        layout
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            duration: 0.25,
            ease: cubicBezier.apply(null, cubicBezierDefinition),
          },
        }}
        exit={{
          opacity: 0,
          x: '100%',
          transition: {
            duration: 0.5,
            ease: cubicBezier.apply(null, cubicBezierDefinition),
          },
        }}
      >
        <Cluster
          className={clsx(toast({ running }), className)}
          style={assignInlineVars({ [durationVar]: `${durationValue}ms` })}
          paddingBlock="md"
          paddingInlineEnd={action ? 'xl' : 'md'}
          paddingInlineStart="md"
          borderRadius={{ xs: 'none', md: 'small' }}
          justifyContent="space-between"
          tintScheme={tintScheme}
          boxShadow="high"
          width="full"
        >
          <Stack gap="sm">
            {title && <ToastTitle>{title}</ToastTitle>}
            {description && <ToastDescription>{description}</ToastDescription>}
          </Stack>

          {action && <ToastAction tintScheme={actionsTintScheme} {...action} />}
          <ToastClose tintScheme={actionsTintScheme} />
        </Cluster>
      </AnimatedBox>
    </Root>
  );
};

const WrappedToast = forwardRef(Toast);

export { WrappedToast as Toast };
