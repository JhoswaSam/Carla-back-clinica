import { EntityBase } from "../config/base.entity";
import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Sexo } from "../shared/emuns/sexo";
import { DiagnosticoEntity } from "./diagnostico.entity";

@Entity({ name: "paciente" })
export class PacienteEntity extends EntityBase {
  @PrimaryGeneratedColumn()
  IdPaciente!: number;

  @Column()
  Nombre!: string;

  @Column()
  Apellidos!: string;

  @Column()
  FechaNacimiento!: Date;

  @Column({ type: "enum", enum: Sexo, nullable: false })
  Sexo!: Sexo;

  @Column()
  Peso!: string;

  @Column()
  Altura!: string;

  @Column()
  PresionArterial!: string;

  @Column()
  FrecuenciaCardiaca!: string;

  @Column()
  Temperatura!: string;

  @Column()
  Observaciones!: string;

  @OneToMany(() => DiagnosticoEntity, (diagnostico) => diagnostico.Paciente)
  Diagnosticos!: DiagnosticoEntity[];
}
