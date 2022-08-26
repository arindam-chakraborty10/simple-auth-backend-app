export class StatusError extends Error {
  statusCode: number;
  constructor(code: number, message: string) {
    super(message);
    this.statusCode = code;
  }
  static badRequest(message: string | undefined) {
    return new StatusError(400, message || 'bad request');
  }
  static unauthorized(message: string | undefined) {
    return new StatusError(401, message || 'unauthorized');
  }
  static forbidden(message: string | undefined) {
    return new StatusError(403, message || 'forbidden');
  }
  static notFound(message: string | undefined) {
    return new StatusError(404, message || 'not found');
  }
  static srverError(message: string | undefined) {
    return new StatusError(500, message || 'server error');
  }
}
