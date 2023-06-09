import { Response } from "express";

export enum HttpStatus {
  OK = 200,
  NOT_FOUND = 404,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  INTERNAL_SERVER_ERROR = 500,
  BAD_REQUEST = 400,
}

export class HttpResponse {
  Ok(res: Response, data?: any): Response {
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      statusMsg: "Success",
      data: data,
    });
  }

  NotFound(res: Response, data?: any): Response {
    return res.status(HttpStatus.NOT_FOUND).json({
      status: HttpStatus.NOT_FOUND,
      statusMsg: "Not Found",
      error: data,
    });
  }

  Unauthorized(res: Response, data?: any): Response {
    return res.status(HttpStatus.UNAUTHORIZED).json({
      status: HttpStatus.UNAUTHORIZED,
      statusMsg: "Unauthorized",
      error: data,
    });
  }

  Forbidden(res: Response, data?: any): Response {
    return res.status(HttpStatus.FORBIDDEN).json({
      status: HttpStatus.FORBIDDEN,
      statusMsg: "Forbidden",
      error: data,
    });
  }

  Error(res: Response, data?: any): Response {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      statusMsg: "Internal server error",
      error: data,
    });
  }

  UserOk(res: Response, data?: any): Response {
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      statusMsg: "Valid access",
      data: data,
    });
  }

  UserDenied(res: Response, data?: any): Response {
    return res.status(HttpStatus.FORBIDDEN).json({
      status: HttpStatus.FORBIDDEN,
      statusMsg: "access denied",
      data: data,
    });
  }

  UserExists(res: Response, data?: any): Response {
    return res.status(HttpStatus.BAD_REQUEST).json({
      status: HttpStatus.BAD_REQUEST,
      statusMsg: "Data enviada de manera erronea",
      data: data,
    });
  }
}
