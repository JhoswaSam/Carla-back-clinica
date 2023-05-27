import { Request, Response } from "express";
import { HttpResponse } from "../shared/response/http.response";
import { DiagnosticoService } from "../service/diagnostico.service";

export class DiagnosticoController {
  constructor(
    private readonly diagnosticoService: DiagnosticoService = new DiagnosticoService(),
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}

  async getDiagnosticos(req: Request, res: Response) {
    try {
      const data = await this.diagnosticoService.findAllDiagnostico();
      if (data.length === 0) {
        return this.httpResponse.NotFound(res, "No existen datos");
      }
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      return this.httpResponse.NotFound(res, e);
    }
  }

  async getDiagnosticoById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.diagnosticoService.findDiagnosticoById(parseInt(id));
      if (!data) {
        return this.httpResponse.NotFound(res, "No existe datos");
      }
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      return this.httpResponse.NotFound(res, e);
    }
  }

  async createDiagnostico(req: Request, res: Response) {
    try {
      const data = await this.diagnosticoService.createDiagnostico(req.body);
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      return this.httpResponse.NotFound(res, e);
    }
  }

  async updateDiagnostico(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.diagnosticoService.updateDiagnostico(parseInt(id), req.body);
      if (!data.affected) {
        return this.httpResponse.NotFound(res, "Hay un error al actualizar");
      }

      return this.httpResponse.Ok(res, data);
    } catch (e) {
      return this.httpResponse.NotFound(res, e);
    }
  }

  async deteleDiagnostico(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.diagnosticoService.deleteDiagnostico(parseInt(id));
      if (!data.affected) {
        return this.httpResponse.NotFound(res, "Hay un error al actualizar");
      }

      return this.httpResponse.Ok(res, data);
    } catch (e) {
      return this.httpResponse.NotFound(res, e);
    }
  }
}
