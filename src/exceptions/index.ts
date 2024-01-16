import BadRequestException from "./bad-request.exception";
import NotFoundException from "./not-found.exception";
import UnauthorizedException from "./unauthorized.exception";

export { BadRequestException, NotFoundException, UnauthorizedException };

export type errorTypes =
  | NotFoundException
  | UnauthorizedException
  | BadRequestException;
