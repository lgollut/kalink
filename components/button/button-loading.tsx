'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ElementType, ForwardedRef, forwardRef } from 'react';

import { Box } from '@/components/box';
import { MoonLoader } from '@/components/loader';
import { FixedForwardRef } from '@/types/utils.types';

import { ButtonInternal, iconProps } from './button-internal';
import { ButtonLoadingProps } from './button.types';

const fixedForwardRef = forwardRef as FixedForwardRef;

const layoutTransition = {
  layout: { type: 'spring', stiffness: 400, damping: 30 },
};
const initial = { opacity: 0 };
const enterAnimation = {
  opacity: 1,
  transition: { duration: 0.25, delay: 0.25 },
};
const exitAnimation = {
  opacity: 0,
  transition: { duration: 0.25 },
};

const ButtonLoading = <TUse extends ElementType>(
  props: ButtonLoadingProps,
  ref: ForwardedRef<any>,
) => {
  const {
    loading,
    icon: IconComp,
    size,
    children,
    disabled,
    childrenComputedKey = 'children',
    ...rest
  } = props;

  return (
    <ButtonInternal
      ref={ref}
      use={motion.button}
      disabled={loading || disabled}
      size={size}
      layout
      transition={layoutTransition}
      {...rest}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        {loading ? (
          <Box
            use={motion.div}
            key="loader"
            initial={initial}
            animate={enterAnimation}
            exit={exitAnimation}
            layout="position"
          >
            <MoonLoader active={true} forceMount size="md" />
          </Box>
        ) : (
          IconComp && (
            <Box
              use={motion.div}
              key="icon"
              initial={initial}
              animate={enterAnimation}
              exit={exitAnimation}
            >
              <IconComp {...iconProps(size)} />
            </Box>
          )
        )}
        {children && (
          <Box
            use={motion.div}
            key={childrenComputedKey}
            initial={initial}
            animate={enterAnimation}
            exit={exitAnimation}
            layout="position"
            transition={layoutTransition}
          >
            {children}
          </Box>
        )}
      </AnimatePresence>
    </ButtonInternal>
  );
};

const WrappedButtonLoading = fixedForwardRef(ButtonLoading);

export { WrappedButtonLoading as ButtonLoading };
