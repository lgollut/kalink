import { serialize, wrapMapSerializer } from '@prismicio/client/richtext';
import { PrismicNextLink } from '@prismicio/next';
import { Route } from 'next';
import Image from 'next/image';
import { ReactNode, useMemo } from 'react';

import { Heading } from '../heading';
import { Stack } from '@/components/stack';
import { Text } from '@/components/text';

import { alignEnd, blockquote, richText } from './rich-text.css';
import { RichTextProps } from './rich-text.types';

const replaceMap = {
  '« ': '«\u202F',
  ' »': '\u202F»',
  ' :': '\u202F:',
  ' ;': '\u202F;',
  ' !': '\u202F!',
  ' ?': '\u202F?',
};

function replaceSpaces(text: string, nb: number) {
  const regex = /\u{0020}(?=[\u{00A0}\u{202F}\S]*$)/gu;

  for (let i = 0; i < nb; i++) {
    text = text.replace(regex, '\u00A0');
  }

  return text;
}

function parseText(text: unknown, nb: number = 2): ReactNode {
  if (Array.isArray(text)) {
    return text.map(parseText);
  }

  if (typeof text !== 'string') {
    return text as ReactNode;
  }

  let formattedText: string = text;

  for (const [key, value] of Object.entries(replaceMap)) {
    formattedText = formattedText.replaceAll(key, value);
  }

  return replaceSpaces(formattedText, nb);
}

const markdownSerializer = wrapMapSerializer({
  heading1: ({ children }) => {
    return (
      <Heading use="h1" marginBlockEnd="none">
        {parseText(children, 1)}
      </Heading>
    );
  },
  heading2: ({ children }) => {
    return (
      <Heading use="h2" marginBlockEnd="none">
        {parseText(children, 1)}
      </Heading>
    );
  },
  heading3: ({ children }) => {
    return (
      <Heading use="h3" marginBlockEnd="none">
        {parseText(children, 1)}
      </Heading>
    );
  },
  heading4: ({ children }) => {
    return (
      <Heading use="h4" marginBlockEnd="none">
        {parseText(children, 1)}
      </Heading>
    );
  },
  heading5: ({ children }) => {
    return (
      <Heading use="h5" marginBlockEnd="none">
        {parseText(children, 1)}
      </Heading>
    );
  },
  heading6: ({ children }) => {
    return (
      <Heading use="h6" marginBlockEnd="none">
        {parseText(children, 1)}
      </Heading>
    );
  },
  paragraph: ({ node, children }) => {
    const labelSpan = node.spans.find((span) => span.type === 'label');

    const parsedText = parseText(children) as NonNullable<ReactNode>;

    if (!labelSpan || labelSpan.type !== 'label') {
      return <Text use="p">{parsedText}</Text>;
    }

    switch (labelSpan.data.label) {
      case 'quote':
        return (
          <Text use="blockquote" className={blockquote}>
            {parsedText}
          </Text>
        );
      case 'align-end':
        return (
          <Text use="p" className={alignEnd}>
            {parsedText}
          </Text>
        );
      case 'legend':
        return (
          <Text
            use="p"
            typography="bodySmall"
            textAlign="end"
            className={alignEnd}
          >
            {parsedText}
          </Text>
        );
      default:
        return <Text use="p">{parsedText}</Text>;
    }
  },
  preformatted: ({ text }) => <pre>{text}</pre>,
  strong: ({ children }) => <strong>{parseText(children)}</strong>,
  em: ({ children }) => <em>{parseText(children)}</em>,
  listItem: ({ children }) => <li>{parseText(children)}</li>,
  oListItem: ({ children }) => <li>{parseText(children)}</li>,
  list: ({ children }) => <ul>{parseText(children)}</ul>,
  oList: ({ children }) => <ol>{parseText(children)}</ol>,
  image: ({ node }) => <Image alt={node.alt ?? ''} src={node.url} />,
  embed: ({ node }) => `${node.oembed.html}\n\n`,
  hyperlink: ({ node, children }) => (
    <PrismicNextLink href={node.data.url as Route}>
      <Text use="span" typography="bodySmall" color="primary">
        {parseText(children)}
      </Text>
    </PrismicNextLink>
  ),
  label: ({ node, children }) => {
    switch (node.data.label) {
      case 'codespan':
        return <Text use="code">{parseText(children)}</Text>;
      case 'quote':
      case 'align-end':
      case 'legend':
      case 'link':
        return <>{parseText(children)}</>;
      default:
        return <Text className={node.data.label}>{parseText(children)}</Text>;
    }
  },
  span: ({ text }) => text.replace('\n', '<br/>'),
});

export function RichText({ field }: RichTextProps) {
  const rendered = useMemo(
    () => serialize(field, markdownSerializer) as ReactNode,
    [field],
  );

  return (
    <Stack gap="lg" className={richText}>
      {rendered}
    </Stack>
  );
}
