import { EntityBase } from "../config/base.entity";
import { Entity, Column, OneToMany, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { PacienteEntity } from "./paciente.entity";
import { MedicoEntity } from "./medico.entity";

@Entity({ name: "diagnostico" })
export class DiagnosticoEntity extends EntityBase {
  @PrimaryGeneratedColumn()
  Id!: number;

  @Column()
  Fecha!: Date;

  @Column()
  Enfermedad!: string;

  @Column()
  Sintomas!: string;

  @Column()
  Tratamiento!: string;

  @Column()
  Observaciones!: string;


  @ManyToOne(() => PacienteEntity, (paciente) => paciente.Diagnosticos)
  Paciente!: PacienteEntity;
  
  @ManyToOne(() => MedicoEntity, (medico) => medico.Diagnosticos)
  Medico!: MedicoEntity;
}
