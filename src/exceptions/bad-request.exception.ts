import HttpException from "./http.exception";

export default class BadRequestException extends HttpException {
  constructor(message: string, statusCode?: number | undefined) {
    super(message, statusCode || 400, "BadRequestException");
  }
}
