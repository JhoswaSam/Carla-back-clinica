import { NextFunction, Request, Response } from "express";
import { validate } from "class-validator";
import { HttpResponse } from "../shared/response/http.response";
import { DiagnosticoDTO } from "../dto/diagnostico.dto";

export class DiagnosticoMiddleware {
  constructor(
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}

  DiagnosticoValidator(req: Request, res: Response, next: NextFunction) {
    const { Paciente,Medico,Fecha,Enfermedad,Sintomas,Tratamiento,Observaciones } = req.body;

    const valid = new DiagnosticoDTO();

    valid.Paciente = Paciente;
    valid.Medico = Medico;
    valid.Fecha = Fecha;
    valid.Enfermedad = Enfermedad;
    valid.Sintomas = Sintomas;
    valid.Tratamiento = Tratamiento;
    valid.Observaciones = Observaciones;

    validate(valid).then((err) => {
      if (err.length > 0) {
        return this.httpResponse.Error(res, err);
      } else {
        next();
      }
    });
  }
}
