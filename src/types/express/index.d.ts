import User from "../../database/entities/user.entity";

declare global {
  namespace Express {
    export interface Request {
      user?: User;
    }
  }
}
