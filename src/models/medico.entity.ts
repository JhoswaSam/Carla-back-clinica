import { EntityBase } from "../config/base.entity";
import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Sexo } from "../shared/emuns/sexo";
import { DiagnosticoEntity } from "./diagnostico.entity";

@Entity({ name: "medico" })
export class MedicoEntity extends EntityBase {
  @PrimaryGeneratedColumn()
  IdMedico!: number;

  @Column()
  Nombre!: string;

  @Column()
  Apellido!: string;

  @Column()
  FechaNacimiento!: Date;

  @Column({type:"enum", enum:Sexo, nullable:false})
  Genero!: Sexo;

  @Column()
  Direccion!: string;

  @Column()
  Ciudad!: string;

  @Column()
  Pais!: string;

  @Column()
  Telefono!: string;

  @Column()
  CorreoElectronico!: string;

  @Column()
  Especialidad!: string;

  @Column()
  NumeroColegiatura!: string;

  @Column()
  DescripcionProfecional!: string;

  @OneToMany(() => DiagnosticoEntity, (diagnostico) => diagnostico.Medico)
  Diagnosticos!: DiagnosticoEntity[];
}
