import { IsDate, IsDateString, IsNotEmpty, IsOptional } from "class-validator";
import { DTOBase } from "../config/base.dto";
import { PacienteEntity } from "../models/paciente.entity";
import { MedicoEntity } from "../models/medico.entity";
import { Sexo } from "../shared/emuns/sexo";

export class PacienteDTO extends DTOBase {
  @IsOptional()
  IdPaciente!: number;

  @IsNotEmpty()
  Nombre!: string;

  @IsNotEmpty()
  Apellidos!: string;

  @IsNotEmpty()
  @IsDateString()
  FechaNacimiento!: Date;

  @IsNotEmpty()
  Sexo!: Sexo;

  @IsNotEmpty()
  Peso!: string;

  @IsNotEmpty()
  Altura!: string;

  @IsNotEmpty()
  PresionArterial!: string;

  @IsNotEmpty()
  FrecuenciaCardiaca!: string;

  @IsNotEmpty()
  Temperatura!: string;

  @IsNotEmpty()
  Observaciones!: string;
}
