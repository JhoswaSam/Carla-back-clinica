import { IsOptional, IsDate, IsUUID  } from "class-validator";

export class DTOBase{

    @IsDate()
    @IsOptional()
    createdAd!: Date;

    @IsDate()
    @IsOptional()
    updateAd!: Date;
}