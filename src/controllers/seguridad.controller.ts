import { Request, Response } from "express";
import { Security } from "../service/security.service";
import { HttpResponse } from "../shared/response/http.response";

export class AuthController extends Security{
    constructor(
        private readonly httpResponse: HttpResponse = new HttpResponse()
    ){
        super();
    }

    async Login(req:Request,res:Response){
        try {
            const {usuario,contrasenia} = req.body

            // Verificamos si esta logeado o no 
            const token = req.cookies.accessToken
            if (token) {
                return this.httpResponse.Unauthorized(res,"Hay una sesion abierta");
            }

            const dataResult = await this.validateUser(usuario,contrasenia)

            if (!dataResult) {
                return this.httpResponse.UserDenied(res,"Usuario y/o contraseña incorrectos")
            }

            
            const encode = await this.generateJWT(dataResult);
            if (!encode) {
                return this.httpResponse.Unauthorized(res,"No tienes permisos");
            }

            res.header("Content-Type", "application/json");
            res.cookie("accessToken", encode.accessToken, {maxAge: 60000*60});
            res.write(JSON.stringify(encode));
            res.end();
          
        } catch (error) {
            console.error(error);
            return this.httpResponse.Error(res,error)
        }
    }

    async Logout(req:Request,res:Response){
        try {
            // Verificamos si esta logeado o no 
            const token = req.cookies.accessToken
            if (!token) {
                return this.httpResponse.Unauthorized(res,"No se pudo cerrar la sesion");
            }

            // Si existe el token de log entonces lo borramos para cerrar sesion
            res.clearCookie("accessToken");
            return this.httpResponse.Ok(res,"Salio de su sesion")
            
        } catch (error) {
            return this.httpResponse.Error(res,error)
        }
    }

}