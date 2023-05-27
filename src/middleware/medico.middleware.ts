import { NextFunction, Request, Response } from "express";
import { validate } from "class-validator";
import { HttpResponse } from "../shared/response/http.response";
import { MedicoDTO } from "../dto/medico.dto";

export class MedicoMiddleware {
  constructor(
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}

  MedicoValidator(req: Request, res: Response, next: NextFunction) {
    const {
      Nombre,
      Apellido,
      FechaNacimiento,
      Genero,
      Direccion,
      Ciudad,
      Pais,
      Telefono,
      CorreoElectronico,
      Especialidad,
      NumeroColegiatura,
      DescripcionProfecional,
    } = req.body;

    const valid = new MedicoDTO();

    valid.Nombre = Nombre;
    valid.Apellido = Apellido;
    valid.FechaNacimiento = FechaNacimiento;
    valid.Genero = Genero;
    valid.Direccion = Direccion;
    valid.Ciudad = Ciudad;
    valid.Pais = Pais;
    valid.Telefono = Telefono;
    valid.CorreoElectronico = CorreoElectronico;
    valid.Especialidad = Especialidad;
    valid.NumeroColegiatura = NumeroColegiatura;
    valid.DescripcionProfecional = DescripcionProfecional;

    validate(valid).then((err) => {
      if (err.length > 0) {
        return this.httpResponse.Error(res, err);
      } else {
        next();
      }
    });
  }
}
