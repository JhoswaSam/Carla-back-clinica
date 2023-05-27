import { Request, Response } from "express";
import { DeleteResult, UpdateResult } from "typeorm";
import { HttpResponse } from "../shared/response/http.response";
import { MedicoService } from "../service/medico.service";

export class MedicoController {
  constructor(
    private readonly medicoService: MedicoService = new MedicoService(),
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}

  async getMedicos(req: Request, res: Response) {
    try {
      const data = await this.medicoService.findAllMedicos();
      if (data.length === 0) {
        return this.httpResponse.NotFound(res, "No existe dato");
      }
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res, e);
    }
  }

  async getMedicoById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.medicoService.findMedicoById(parseInt(id));
      if (!data) {
        return this.httpResponse.NotFound(res, "No existe dato");
      }
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res, e);
    }
  }

  async createMedico(req: Request, res: Response) {
    try {
      const verificarCorreo = await this.medicoService.findCorreo(
        req.body.CorreoElectronico
      );

      if (!verificarCorreo) {
        const data = await this.medicoService.createMedico(req.body);

        return this.httpResponse.Ok(res, data);
      }else{
        return this.httpResponse.UserDenied(res,"No se puede crear este usuario por que el correo ya existe")
      }

    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res, e);
    }
  }

  async updateMedico(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data: UpdateResult = await this.medicoService.updateMedico(
        parseInt(id),
        req.body
      );
      if (!data.affected) {
        return this.httpResponse.NotFound(res, "Hay un error en actualizar");
      }

      return this.httpResponse.Ok(res, data);
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res, e);
    }
  }

  async deleteMedico(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data: DeleteResult = await this.medicoService.deleteMedico(
        parseInt(id)
      );
      if (!data.affected) {
        return this.httpResponse.NotFound(res, "Hay un error en actualizar");
      }
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res, e);
    }
  }
}
