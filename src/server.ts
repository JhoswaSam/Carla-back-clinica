import "reflect-metadata";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import { ConfigServer } from "./config/config";
import { DataSource } from "typeorm";
import cookieParser from "cookie-parser";
import { DiagnosticoRouter } from "./router/diagnostico.router";
import { MedicoRouter } from "./router/medico.router";
import { PacienteRouter } from "./router/paciente.router";


/**
 * 
 */
class ServerBootstrap extends ConfigServer{
    public app: express.Application = express();
    private port: number = this.getNumberEnv('PORT');

    /**
     * Contructor de las dependencias para el servidor y iniciamos el servidor
     */
    constructor(){
        super();
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended : true }));
        this.app.use(cookieParser())
        this.bdConnection();
        this.app.use(morgan('dev'));
        
        this.app.use(
            cors({
              origin: true,
              methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
              credentials: true,
            })
          );

        this.app.use('/api',this.routers())
        this.listen();
    }


    private routers(): Array<express.Router>{
        return [
            //Rutas de los controladores
            new DiagnosticoRouter().router,
            new MedicoRouter().router,
            new PacienteRouter().router,
        ];
    }

    async bdConnection():Promise<DataSource | void>{
        return this.initConnection.then(()=>{
            console.log("Connect success");
        }).catch((err)=>{
            console.log(err);
        })
    }

    //Puerto escucha
    public listen(): void{
        this.app.listen(this.port,()=>{
            console.log("Server listening on port : "+this.port);
        });        
    }

}

new ServerBootstrap