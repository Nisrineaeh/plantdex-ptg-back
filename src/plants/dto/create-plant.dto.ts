
import { ApiProperty } from "@nestjs/swagger";

export class CreatePlantDto {
    @ApiProperty()
    code_plant:number;

    @ApiProperty()
    nom: string;

    @ApiProperty()
    soleil: string;

    @ApiProperty()
    arrosage: number;

    @ApiProperty()
    categorie: string;
    
    @ApiProperty({ type: 'string', format: 'binary' })
    image: any; 

}
