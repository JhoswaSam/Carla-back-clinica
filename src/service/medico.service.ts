import { DeleteResult, UpdateResult } from "typeorm";
import { ServiceBase } from "../config/base.service";
import { MedicoEntity } from "../models/medico.entity";
import { MedicoDTO } from "../dto/medico.dto";
import * as bcrypt from "bcrypt";

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
    const auxDoc = (await this.execRepository).create(body);

    // Ponemos el dni como contraseña
    auxDoc.Contrasenia = auxDoc.Nombre;

    // Encriptamos la contraseña
    const hast = await bcrypt.hash(auxDoc.Contrasenia, 10);
    auxDoc.Contrasenia = hast;

    return (await this.execRepository).save(auxDoc);
  }

  async deleteMedico(IdMedico: number): Promise<DeleteResult> {
    return (await this.execRepository).delete({ IdMedico });
  }

  async updateMedico(
    IdMedico: number,
    infoUpdate: MedicoDTO
  ): Promise<UpdateResult> {
    return (await this.execRepository).update(IdMedico, infoUpdate);
  }

  async findCorreo(correo: string): Promise<MedicoEntity | null> {
    return (await this.execRepository)
      .createQueryBuilder("medico")
      .where("medico.CorreoElectronico = :correo", { correo: correo })
      .getOne();
  }
}
