import { IsDate, IsDateString, IsNotEmpty, IsOptional } from "class-validator";
import { DTOBase } from "../config/base.dto";
import { PacienteEntity } from "../models/paciente.entity";
import { MedicoEntity } from "../models/medico.entity";

export class DiagnosticoDTO extends DTOBase {
  @IsOptional()
  Id!: number;

  @IsNotEmpty()
  @IsDateString()
  Fecha!: Date;

  @IsNotEmpty()
  Enfermedad!: string;

  @IsNotEmpty()
  Sintomas!: string;

  @IsNotEmpty()
  Tratamiento!: string;

  @IsNotEmpty()
  Observaciones!: string;

  @IsNotEmpty()
  Paciente!: PacienteEntity;

  @IsNotEmpty()
  Medico!: MedicoEntity;
}
