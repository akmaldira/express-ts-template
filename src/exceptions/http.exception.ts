export default class HttpException extends Error {
  public statusCode: number;
  public errors: any[];

  constructor(message: string, statusCode: number, name?: string) {
    super(message);
    this.name = name || "HttpException";
    this.statusCode = statusCode;
    this.message = message;
    this.errors = [];
  }
}
