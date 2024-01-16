import HttpException from "./http.exception";

export default class NotFoundException extends HttpException {
  constructor(message: string, statusCode?: number | undefined) {
    super(message, statusCode || 404, "NotFoundException");
  }
}
