'use server';

import { Client, PrismicDocument } from '@prismicio/client';
import { cacheTag } from 'next/dist/server/use-cache/cache-tag';

import { createClient } from './prismic-client';

export const getByID = async function getByID<
  TDocument extends PrismicDocument,
>(
  id: Parameters<Client['getByID']>[0],
  params?: Parameters<Client['getByID']>[1],
) {
  'use cache';

  const client = createClient<TDocument>();

  const document = await client.getByID(id, params);

  cacheTag('prismic', document.id);

  return document as Awaited<ReturnType<Client<TDocument>['getByID']>>;
};

export const getByUID = async function getByUID<
  TDocument extends PrismicDocument,
  TDocumentType extends TDocument['type'] = TDocument['type'],
>(
  documentType: TDocumentType,
  uid: Parameters<Client['getByUID']>[1],
  params?: Parameters<Client['getByUID']>[2],
) {
  'use cache';

  const client = createClient<TDocument>();
  let document: TDocument;

  try {
    document = await client.getByUID(documentType, uid, params);
  } catch (err) {
    console.error(err);

    throw new Error(`Document ${uid} not found`);
  }

  cacheTag('prismic', document.id);

  return document;
};

export const getSingle = async function getSingle<
  TDocument extends PrismicDocument,
  TDocumentType extends TDocument['type'] = TDocument['type'],
>(documentType: TDocumentType, params?: Parameters<Client['getSingle']>[1]) {
  'use cache';

  const client = createClient<TDocument>();

  const document = await client.getSingle(documentType, params);

  cacheTag('prismic', document.id);

  return document as Awaited<ReturnType<Client<TDocument>['getSingle']>>;
};

export const getByIDs = async function getByIDs<
  TDocument extends PrismicDocument,
>(
  ids: Parameters<Client['getByIDs']>[0],
  params?: Parameters<Client['getByIDs']>[1],
) {
  'use cache';

  const client = createClient<TDocument>();

  const documents = await client.getByIDs(ids, params);

  cacheTag.apply(undefined, [
    'prismic',
    ...documents.results.map((document) => document.id),
  ]);

  return documents;
};

export const getByUIDs = async function getByUIDs<
  TDocument extends PrismicDocument,
  TDocumentType extends TDocument['type'] = TDocument['type'],
>(
  documentType: TDocumentType,
  ids: Parameters<Client['getByUIDs']>[1],
  params?: Parameters<Client['getByUIDs']>[2],
) {
  'use cache';

  const client = createClient<TDocument>();

  const documents = await client.getByUIDs(documentType, ids, params);

  cacheTag.apply(undefined, [
    'prismic',
    ...documents.results.map((document) => document.id),
  ]);

  return documents;
};

export const getAllByType = async function getAllByType<
  TDocument extends PrismicDocument,
  TDocumentType extends TDocument['type'] = TDocument['type'],
>(documentType: TDocumentType, params?: Parameters<Client['getAllByType']>[1]) {
  'use cache';

  const client = createClient<TDocument>();

  const documents = await client.getAllByType(documentType, params);

  cacheTag.apply(undefined, [
    'prismic',
    ...documents.map((document) => document.id),
  ]);

  return documents;
};
