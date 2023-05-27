import { IsDate, IsDateString, IsNotEmpty, IsOptional } from "class-validator";
import { DTOBase } from "../config/base.dto";
import { PacienteEntity } from "../models/paciente.entity";
import { MedicoEntity } from "../models/medico.entity";
import { Sexo } from "../shared/emuns/sexo";

export class MedicoDTO extends DTOBase {
    @IsOptional()
    IdMedico!: number;
  
    @IsNotEmpty()
    Nombre!: string;
  
    @IsNotEmpty()
    Apellido!: string;
  
    @IsNotEmpty()
    @IsDateString()
    FechaNacimiento!: Date;
  
    @IsNotEmpty()
    Genero!: Sexo;
  
    @IsNotEmpty()
    Direccion!: string;
  
    @IsNotEmpty()
    Ciudad!: string;
  
    @IsNotEmpty()
    Pais!: string;
  
    @IsNotEmpty()
    Telefono!: string;
  
    @IsNotEmpty()
    CorreoElectronico!: string;
  
    @IsNotEmpty()
    Especialidad!: string;
  
    @IsNotEmpty()
    NumeroColegiatura!: string;
  
    @IsNotEmpty()
    DescripcionProfecional!: string;
  
}
