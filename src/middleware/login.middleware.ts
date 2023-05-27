import { NextFunction ,Request, Response } from "express";
import { validate } from "class-validator";
import { HttpResponse } from "../shared/response/http.response";
import { Security } from "../service/security.service";
import { UserDto } from "../dto/login.dto";


export class LoginValidatorMiddleware{
    constructor(
        private readonly httpResponse: HttpResponse = new HttpResponse(),
        private readonly loginService: Security = new Security()
    ){  }
    
    validateAdmin(req: Request, res: Response, next: NextFunction){
        const {usuario,contrasenia} =  req.body;

        const valid = new UserDto();

        valid.usuario = usuario;
        valid.contrasenia = contrasenia;

        validate(valid).then((err)=>{
            if (err.length > 0) {
                return this.httpResponse.Error(res,err)
            }else{
                next()
            }
        })
        
    }
}