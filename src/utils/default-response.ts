import { Response } from "express";

export class AppResponse {
  private statusCode: number;
  private message: string;
  private data: any;
  private errors: any[];

  constructor(
    statusCode: number,
    message: string,
    data: any,
    errors: any[] = [],
  ) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.errors = errors;
  }

  public send(res: Response): void {
    res.status(this.statusCode).json({
      message: this.message,
      data: this.data,
      errors: this.errors,
    });
  }
}
