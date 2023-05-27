import { RouterBase } from "../config/router";
import { DiagnosticoController } from "../controllers/diagnostico.controller";
import { PacienteController } from "../controllers/paciente.controller";
import { DiagnosticoMiddleware } from "../middleware/diagnostico.middleware";
import { PacienteMiddleware } from "../middleware/paciente.middleware";

export class PacienteRouter extends RouterBase<PacienteController,PacienteMiddleware>{
    constructor(){
        super(PacienteController,PacienteMiddleware)
    }

    routers():void{
        this.router.get('/pacientes',(req,res)=>this.controller.getPaciente(req,res));
        this.router.get('/paciente/:id',(req,res)=>this.controller.getPacienteById(req,res));
        
        this.router.post('/createPaciente',(req,res,next)=>[this.middleware.PacienteValidator(req,res,next)],(req,res)=>this.controller.createPaciente(req,res));
        
        this.router.put('/updatePaciente/:id',(req,res)=>this.controller.updatePaciente(req,res));
        this.router.delete('/deletePaciente/:id',(req,res)=>this.controller.deletePaciente(req,res));
    }
}