import { ElementType } from 'react';

import { Text } from '../text';
import { TextProps } from '../text/text.types';

type TagProps<TUse extends ElementType> = TextProps<TUse>;

export const Tag = <TUse extends ElementType = 'div'>(
  props: TagProps<TUse>,
) => {
  const { use = 'div', ...rest } = props;
  return (
    <Text
      use={use}
      tintScheme="surface"
      paddingBlock="sm"
      paddingInline="base"
      borderRadius="default"
      typography="labelMedium"
      {...rest}
    />
  );
};
