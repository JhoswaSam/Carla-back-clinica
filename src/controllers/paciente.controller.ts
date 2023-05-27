import { Request, Response } from "express";
import { DeleteResult, UpdateResult } from "typeorm";
import { HttpResponse } from "../shared/response/http.response";
import { PacienteService } from "../service/paciente.service";

export class PacienteController {
  constructor(
    private readonly pacienteService: PacienteService = new PacienteService(),
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}

  async getPaciente(req: Request, res: Response) {
    try {
      const data = await this.pacienteService.findAllPaciente();
      if (data.length === 0) {
        return this.httpResponse.NotFound(res, "No existe dato");
      }
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res, e);
    }
  }

  async getPacienteById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.pacienteService.findPacienteById(parseInt(id));
      if (!data) {
        return this.httpResponse.NotFound(res, "No existe dato");
      }
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res, e);
    }
  }

  async createPaciente(req: Request, res: Response) {
    try {
      const data = await this.pacienteService.createPaciente(req.body);
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res, e);
    }
  }

  async updatePaciente(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data: UpdateResult = await this.pacienteService.updatePaciente(
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

  async deletePaciente(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data: DeleteResult = await this.pacienteService.deletePaciente(
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