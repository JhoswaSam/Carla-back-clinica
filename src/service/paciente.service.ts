import { Request } from "express";
import { ServiceBase } from "../config/base.service";
import { PacienteEntity } from "../models/paciente.entity";
import QueryString from "qs";
import { PacienteDTO } from "../dto/paciente.dto";
import { DeleteResult, UpdateResult } from "typeorm";

export class PacienteService extends ServiceBase<PacienteEntity> {
  constructor() {
    super(PacienteEntity);
  }
  async findAllPaciente(): Promise<PacienteEntity[]> {
    return (await this.execRepository).find();
  }
  async findPacienteById(IdPaciente: number): Promise<PacienteEntity | null> {
    return (await this.execRepository).findOneBy({ IdPaciente });
  }
  async createPaciente(body: PacienteDTO): Promise<PacienteEntity> {
    return (await this.execRepository).save(body);
  }
  async deletePaciente(IdPaciente: number): Promise<DeleteResult> {
    return (await this.execRepository).delete({ IdPaciente });
  }
  async updatePaciente(
    IdPaciente: number,
    infoUpdate: PacienteDTO
  ): Promise<UpdateResult> {
    return (await this.execRepository).update(IdPaciente, infoUpdate);
  }
}
