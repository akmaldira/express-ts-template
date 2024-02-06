import HttpException from "./http.exception";

export default class ForbiddenException extends HttpException {
  constructor(message: string, statusCode?: number | undefined) {
    super(message, statusCode || 403, "ForbiddenException");
  }
}
