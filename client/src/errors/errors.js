export const notFoundErrorMessage = 'Item Not Found';
export const connectionErrorMessage = 'Connection Error';

export class AppError extends Error {
  constructor(message, context = { rawError: undefined, context: {} }) {
    super(message);
    this.name = 'AppError';
    this.rawError = context.rawError;
    const rawErrorContext =
      (this.rawError && this.rawError.context) || undefined;
    this.context = { ...rawErrorContext, ...context.context };
    const rawErrorStack = (this.rawError && this.rawError.stack) || undefined;
    this.stack = rawErrorStack;
  }
}
