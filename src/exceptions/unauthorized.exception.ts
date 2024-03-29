import HttpException from "./http.exception";

export default class UnauthorizedException extends HttpException {
  constructor(message: string, statusCode?: number | undefined) {
    super(message, statusCode || 401, "UnauthorizedException");
  }
}
