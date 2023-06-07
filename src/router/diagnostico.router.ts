import { textChangeRangeIsUnchanged } from "typescript";
import { RouterBase } from "../config/router";
import { DiagnosticoController } from "../controllers/diagnostico.controller";
import { DiagnosticoMiddleware } from "../middleware/diagnostico.middleware";

export class DiagnosticoRouter extends RouterBase<DiagnosticoController,DiagnosticoMiddleware>{
    constructor(){
        super(DiagnosticoController,DiagnosticoMiddleware)
    }

    routers():void{
        this.router.get('/diagnosticos',(req,res)=>this.controller.getDiagnosticos(req,res));
        this.router.get('/diagnostico/:id',(req,res)=>this.controller.getDiagnosticoById(req,res));
        
        this.router.post('/createDiagnostico',(req,res,next)=>[this.middleware.DiagnosticoValidator(req,res,next)],(req,res)=>this.controller.createDiagnostico(req,res));
        
        this.router.put('/updateDiagnostico/:id',(req,res)=>this.controller.updateDiagnostico(req,res));
        this.router.delete('/deleteDiagnostico/:id',(req,res)=>this.controller.deteleDiagnostico(req,res));

        this.router.get('/diagnosticos/:id/paciente',(req,res)=>this.controller.listForId(req,res));

        this.router.get('/diagnosticoswithpaciente',(req,res)=>this.controller.listDiagnosticoWithPaciente(req,res));
    }
}