import { Sexo } from "./../shared/emuns/sexo";
import { NextFunction, Request, Response } from "express";
import { validate } from "class-validator";
import { HttpResponse } from "../shared/response/http.response";
import { PacienteDTO } from "../dto/paciente.dto";

export class PacienteMiddleware {
  constructor(
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}

  PacienteValidator(req: Request, res: Response, next: NextFunction) {
    const {
      Nombre,
      Apellidos,
      FechaNacimiento,
      Sexo,
      Peso,
      Altura,
      PresionArterial,
      FrecuenciaCardiaca,
      Temperatura,
      Observaciones,
    } = req.body;

    const valid = new PacienteDTO();

    valid.Nombre = Nombre;
    valid.Apellidos = Apellidos;
    valid.FechaNacimiento = FechaNacimiento;
    valid.Sexo = Sexo;
    valid.Peso = Peso;
    valid.Altura = Altura;
    valid.PresionArterial = PresionArterial;
    valid.FrecuenciaCardiaca = FrecuenciaCardiaca;
    valid.Temperatura = Temperatura;
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
