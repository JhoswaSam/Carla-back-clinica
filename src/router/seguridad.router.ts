import { RouterBase } from "../config/router";
import { AuthController } from "../controllers/seguridad.controller";
import { LoginValidatorMiddleware } from "../middleware/login.middleware";


export class AuthRouter extends RouterBase<AuthController,LoginValidatorMiddleware>{
    constructor(){
        super(AuthController, LoginValidatorMiddleware)
    }

    routers():void{
        this.router.post("/login",(req,res,next) =>
            [this.middleware.validateAdmin(req,res,next)],(req, res) =>
            this.controller.Login(req, res)
        );

        this.router.get("/logout",(req, res) =>
            this.controller.Logout(req, res)
        );     

    }
}