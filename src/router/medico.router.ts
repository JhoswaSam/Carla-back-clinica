import { RouterBase } from "../config/router";
import { MedicoController } from "../controllers/medico.controller";
import { MedicoMiddleware } from "../middleware/medico.middleware";

export class MedicoRouter extends RouterBase<MedicoController,MedicoMiddleware>{
    constructor(){
        super(MedicoController,MedicoMiddleware)
    }

    routers():void{
        this.router.get('/medicos',(req,res)=>this.controller.getMedicos(req,res));
        this.router.get('/medico/:id',(req,res)=>this.controller.getMedicoById(req,res));
        
        this.router.post('/createMedico',(req,res,next)=>[this.middleware.MedicoValidator(req,res,next)],(req,res)=>this.controller.createMedico(req,res));
        
        this.router.put('/updateMedico/:id',(req,res)=>this.controller.updateMedico(req,res));
        this.router.delete('/deleteMedico/:id',(req,res)=>this.controller.deleteMedico(req,res));
    }
}