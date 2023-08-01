export const notFoundErrorMessage = 'Item Not Found';
export const connectionErrorMessage = 'Connection Error';
export const notAuthorizedErrorMessage =
  'You are not authorized to get this page';
export const requestErrorMessage = 'Error in request';
export const wrongPasswordMessage = 'Wrong password';
export const wrongLoginMessage = 'Wrong Login or password';
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
