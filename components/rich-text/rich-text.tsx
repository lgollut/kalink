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
  heading1: ({ children, key }) => {
    return (
      <Heading key={key} use="h1" marginBlockEnd="none">
        {parseText(children, 1)}
      </Heading>
    );
  },
  heading2: ({ children, key }) => {
    return (
      <Heading key={key} use="h2" marginBlockEnd="none">
        {parseText(children, 1)}
      </Heading>
    );
  },
  heading3: ({ children, key }) => {
    return (
      <Heading key={key} use="h3" marginBlockEnd="none">
        {parseText(children, 1)}
      </Heading>
    );
  },
  heading4: ({ children, key }) => {
    return (
      <Heading key={key} use="h4" marginBlockEnd="none">
        {parseText(children, 1)}
      </Heading>
    );
  },
  heading5: ({ children, key }) => {
    return (
      <Heading key={key} use="h5" marginBlockEnd="none">
        {parseText(children, 1)}
      </Heading>
    );
  },
  heading6: ({ children, key }) => {
    return (
      <Heading key={key} use="h6" marginBlockEnd="none">
        {parseText(children, 1)}
      </Heading>
    );
  },
  paragraph: ({ node, children, key }) => {
    const labelSpan = node.spans.find((span) => span.type === 'label');

    const parsedText = parseText(children) as NonNullable<ReactNode>;

    if (!labelSpan || labelSpan.type !== 'label') {
      return (
        <Text key={key} use="p">
          {parsedText}
        </Text>
      );
    }

    switch (labelSpan.data.label) {
      case 'quote':
        return (
          <Text key={key} use="blockquote" className={blockquote}>
            {parsedText}
          </Text>
        );
      case 'align-end':
        return (
          <Text key={key} use="p" className={alignEnd}>
            {parsedText}
          </Text>
        );
      case 'legend':
        return (
          <Text
            key={key}
            use="p"
            typography="bodySmall"
            textAlign="end"
            className={alignEnd}
          >
            {parsedText}
          </Text>
        );
      default:
        return (
          <Text key={key} use="p">
            {parsedText}
          </Text>
        );
    }
  },
  preformatted: ({ text, key }) => <pre key={key}>{text}</pre>,
  strong: ({ children, key }) => (
    <strong key={key}>{parseText(children)}</strong>
  ),
  em: ({ children, key }) => <em key={key}>{parseText(children)}</em>,
  listItem: ({ children, key }) => <li key={key}>{parseText(children)}</li>,
  oListItem: ({ children, key }) => <li key={key}>{parseText(children)}</li>,
  list: ({ children, key }) => <ul key={key}>{parseText(children)}</ul>,
  oList: ({ children, key }) => <ol key={key}>{parseText(children)}</ol>,
  image: ({ node, key }) => (
    <Image key={key} alt={node.alt ?? ''} src={node.url} />
  ),
  embed: ({ node }) => `${node.oembed.html}\n\n`,
  hyperlink: ({ node, children, key }) => (
    <PrismicNextLink key={key} href={node.data.url as Route}>
      <Text use="span" typography="bodySmall" color="primary">
        {parseText(children)}
      </Text>
    </PrismicNextLink>
  ),
  label: ({ node, children, key }) => {
    switch (node.data.label) {
      case 'codespan':
        return (
          <Text key={key} use="code">
            {parseText(children)}
          </Text>
        );
      case 'quote':
      case 'align-end':
      case 'legend':
      case 'link':
        return <>{parseText(children)}</>;
      default:
        return (
          <Text key={key} className={node.data.label}>
            {parseText(children)}
          </Text>
        );
    }
  },
  span: ({ text }) => text, //text.replace('\n', '<br/>'),
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
