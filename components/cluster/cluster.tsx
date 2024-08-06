import { forwardRef, ForwardedRef, ElementType } from 'react';

import { Box } from '@/components/box';

import { ClusterProps } from './cluster.types';

const Cluster = <TUse extends ElementType>(
  {
    flexWrap = 'wrap',
    gap = 'base',
    justifyContent = 'flex-start',
    alignItems = 'center',
    flexGrow = 0,
    ...props
  }: ClusterProps<TUse>,
  ref: ForwardedRef<any>,
) => {
  return (
    <Box
      ref={ref}
      display="flex"
      flexDirection="row"
      flexWrap={flexWrap}
      gap={gap}
      justifyContent={justifyContent}
      alignItems={alignItems}
      flexGrow={flexGrow}
      {...props}
    />
  );
};

/**
 * A custom element for grouping items, with control over the margin between them
 *
 * https://every-layout.dev/layouts/cluster
 */
const WrappedCluster = forwardRef(Cluster);

export { WrappedCluster as Cluster };
