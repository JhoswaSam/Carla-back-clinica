import { Request } from "express";
import { ServiceBase } from "../config/base.service";
import { DiagnosticoEntity } from "../models/diagnostico.entity";
import QueryString from "qs";
import { DiagnosticoDTO } from "../dto/diagnostico.dto";
import { DeleteResult, UpdateResult } from "typeorm";
import { PacienteEntity } from "../models/paciente.entity";

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

  async listDiagnosticoForId(id: number): Promise<DiagnosticoEntity | any> {
    return (await this.execRepository)
      .createQueryBuilder("diagnostico")
      .where("diagnostico.paciente_id_paciente = :id", { id: id })
      .getMany();
  }

  async listDiagnosticoWithPaciente(): Promise<any> {
    // return (await this.execRepository)
    //   .createQueryBuilder("diagnostico")
    //   .addSelect("diagnostico.paciente_id_paciente")
    //   .getMany();

    // return (await this.execRepository)
    //     .createQueryBuilder("diagnostico")
    //     .innerJoinAndSelect('diagnostico.paciente','paciente')
    //     .getQuery();

    // return (await this.execRepository)
    //   .createQueryBuilder("diagnostico")
    //   .leftJoin('diagnostico.paciente', 'paciente')
    //   .getQuery();

    return (await this.execRepository)
      .createQueryBuilder("diagnostico")
      .leftJoinAndMapOne("diagnostico.id", PacienteEntity,'paciente',"paciente.id_paciente = diagnostico.paciente_id_paciente")
      .getMany();
  }
}
