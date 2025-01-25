export class KalinkException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'KalinkException';
  }
}

export class PrismicWebhookException extends KalinkException {
  documentIds: string[];

  constructor(message: string, docukumentIds: string[] = []) {
    super(message);
    this.name = 'PrismicWebhookException';
    this.documentIds = docukumentIds;
  }
}

export class StripeClientException extends KalinkException {
  constructor(message: string) {
    super(message);
    this.name = 'StripeClientException';
  }
}

export class StripeCreateWebhookException extends KalinkException {
  documentId: string;

  constructor(message: string, documentId: string) {
    super(message);
    this.name = 'StripeCreateWebhookException';
    this.documentId = documentId;
  }
}
export class StripeUpdateWebhookException extends KalinkException {
  documentId: string;

  constructor(message: string, documentId: string) {
    super(message);
    this.name = 'StripeUpdateWebhookException';
    this.documentId = documentId;
  }
}

export class StripeDeleteWebhookException extends KalinkException {
  documentId: string;

  constructor(message: string, documentId: string) {
    super(message);
    this.name = 'StripeDeleteWebhookException';
    this.documentId = documentId;
  }
}
