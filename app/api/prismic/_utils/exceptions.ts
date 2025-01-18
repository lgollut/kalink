export class KalinkWebhookException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'KalinkWebhookException';
  }
}

export class PrismicWebhookException extends KalinkWebhookException {
  documentIds: string[];

  constructor(message: string, docukumentIds: string[] = []) {
    super(message);
    this.name = 'PrismicWebhookException';
    this.documentIds = docukumentIds;
  }
}

export class StripeWebhookException extends KalinkWebhookException {
  documentId: string;

  constructor(message: string, documentId: string) {
    super(message);
    this.name = 'StripeWebhookException';
    this.documentId = documentId;
  }
}
