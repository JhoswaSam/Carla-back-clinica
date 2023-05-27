import { Request } from "express";
import { ServiceBase } from "../config/base.service";
import { DiagnosticoEntity } from "../models/diagnostico.entity";
import QueryString from "qs";
import { DiagnosticoDTO } from "../dto/diagnostico.dto";
import { DeleteResult, UpdateResult } from "typeorm";

export class DiagnosticoService extends ServiceBase<DiagnosticoEntity> {
  constructor() {
    super(DiagnosticoEntity);
  }
  async findAllDiagnostico(): Promise<DiagnosticoEntity[]> {
    return (await this.execRepository).find();
  }
  async findDiagnosticoById(Id: number): Promise<DiagnosticoEntity | null> {
    return (await this.execRepository).findOneBy({ Id });
  }
  async createDiagnostico(body: DiagnosticoDTO): Promise<DiagnosticoEntity> {
    return (await this.execRepository).save(body);
  }
  async deleteDiagnostico(Id: number): Promise<DeleteResult> {
    return (await this.execRepository).delete({ Id });
  }
  async updateDiagnostico(
    Id: number,
    infoUpdate: DiagnosticoDTO
  ): Promise<UpdateResult> {
    return (await this.execRepository).update(Id, infoUpdate);
  }
}
