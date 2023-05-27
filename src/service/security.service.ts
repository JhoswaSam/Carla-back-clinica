import { ConfigServer } from "../config/config";
import { MedicoEntity } from "../models/medico.entity";
import { PayloadToken } from "../shared/interfaces/payload.interface";
import { MedicoService } from "./medico.service";

import * as bcrypt from "bcrypt"

import * as jwt from "jsonwebtoken";

export class Security extends ConfigServer{
    constructor(
        private readonly medicoService:MedicoService = new MedicoService(),
        private readonly jwtInstance = jwt,
    ){
        super()
    }

    public async validateUser(usuario:string, contrasenia:string):Promise<any>{
        const user = await this.medicoService.findCorreo(usuario);

        if(user){
            const esIgual = await bcrypt.compare(contrasenia, user.Contrasenia);
            if(esIgual) return user;
        }
        return null

    }

    private sing(payload: jwt.JwtPayload, secret:any){
        return this.jwtInstance.sign(payload,secret, { expiresIn: "1h" })
    }

    public async generateJWT(user: MedicoEntity):Promise<{accessToken: string}|undefined>{

        const usuario = await this.medicoService.findCorreo(user.CorreoElectronico);
    

        if (usuario) {
            const payload: PayloadToken = {
                sub : usuario!.Nombre,
                code: usuario!.IdMedico
            }

            return {
                accessToken: this.sing(payload, process.env.JWT_SECRET)
            };

        } 

    }

}