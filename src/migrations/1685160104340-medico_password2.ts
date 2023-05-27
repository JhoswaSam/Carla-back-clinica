import { MigrationInterface, QueryRunner } from "typeorm";

export class MedicoPassword21685160104340 implements MigrationInterface {
    name = 'MedicoPassword21685160104340'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`paciente\` (\`create_ad\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`update_ad\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`id_paciente\` int NOT NULL AUTO_INCREMENT, \`nombre\` varchar(255) NOT NULL, \`apellidos\` varchar(255) NOT NULL, \`fecha_nacimiento\` datetime NOT NULL, \`sexo\` enum ('M', 'F') NOT NULL, \`peso\` varchar(255) NOT NULL, \`altura\` varchar(255) NOT NULL, \`presion_arterial\` varchar(255) NOT NULL, \`frecuencia_cardiaca\` varchar(255) NOT NULL, \`temperatura\` varchar(255) NOT NULL, \`observaciones\` varchar(255) NOT NULL, PRIMARY KEY (\`id_paciente\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`medico\` (\`create_ad\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`update_ad\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`id_medico\` int NOT NULL AUTO_INCREMENT, \`nombre\` varchar(255) NOT NULL, \`apellido\` varchar(255) NOT NULL, \`fecha_nacimiento\` datetime NOT NULL, \`genero\` enum ('M', 'F') NOT NULL, \`direccion\` varchar(255) NOT NULL, \`ciudad\` varchar(255) NOT NULL, \`pais\` varchar(255) NOT NULL, \`telefono\` varchar(255) NOT NULL, \`correo_electronico\` varchar(255) NOT NULL, \`contrasenia\` varchar(255) NULL, \`especialidad\` varchar(255) NOT NULL, \`numero_colegiatura\` varchar(255) NOT NULL, \`descripcion_profecional\` varchar(255) NOT NULL, PRIMARY KEY (\`id_medico\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`diagnostico\` (\`create_ad\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`update_ad\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`id\` int NOT NULL AUTO_INCREMENT, \`fecha\` datetime NOT NULL, \`enfermedad\` varchar(255) NOT NULL, \`sintomas\` varchar(255) NOT NULL, \`tratamiento\` varchar(255) NOT NULL, \`observaciones\` varchar(255) NOT NULL, \`paciente_id_paciente\` int NULL, \`medico_id_medico\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`diagnostico\` ADD CONSTRAINT \`FK_89117600cf193cffbb6f8c93545\` FOREIGN KEY (\`paciente_id_paciente\`) REFERENCES \`paciente\`(\`id_paciente\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`diagnostico\` ADD CONSTRAINT \`FK_d784f54e1c2c6d58bc62b3e3a07\` FOREIGN KEY (\`medico_id_medico\`) REFERENCES \`medico\`(\`id_medico\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`diagnostico\` DROP FOREIGN KEY \`FK_d784f54e1c2c6d58bc62b3e3a07\``);
        await queryRunner.query(`ALTER TABLE \`diagnostico\` DROP FOREIGN KEY \`FK_89117600cf193cffbb6f8c93545\``);
        await queryRunner.query(`DROP TABLE \`diagnostico\``);
        await queryRunner.query(`DROP TABLE \`medico\``);
        await queryRunner.query(`DROP TABLE \`paciente\``);
    }

}
