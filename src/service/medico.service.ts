import { DeleteResult, UpdateResult } from "typeorm";
import { ServiceBase } from "../config/base.service";
import { MedicoEntity } from "../models/medico.entity";
import { MedicoDTO } from "../dto/medico.dto";

export class MedicoService extends ServiceBase<MedicoEntity> {
  constructor() {
    super(MedicoEntity);
  }
  async findAllMedicos(): Promise<MedicoEntity[]> {
    return (await this.execRepository).find();
  }
  async findMedicoById(IdMedico: number): Promise<MedicoEntity | null> {
    return (await this.execRepository).findOneBy({ IdMedico });
  }

  async createMedico(body: MedicoDTO): Promise<MedicoEntity | null> {
    return (await this.execRepository).save(body);
  }

  async deleteMedico(IdMedico: number): Promise<DeleteResult> {
    return (await this.execRepository).delete({ IdMedico });
  }

  async updateMedico(IdMedico: number, infoUpdate: MedicoDTO): Promise<UpdateResult> {
    return (await this.execRepository).update(IdMedico, infoUpdate);
  }
}
