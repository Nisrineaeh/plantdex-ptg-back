import { Injectable } from '@nestjs/common';
import { CreatePlantDto } from './dto/create-plant.dto';
import { UpdatePlantDto } from './dto/update-plant.dto';
import { Plant } from './entities/plant.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundError } from 'rxjs';


@Injectable()
export class PlantsService {
  constructor(@InjectRepository(Plant) private plantsRepository: Repository<Plant>){}

  async create(createPlantDto: CreatePlantDto) {
    const plant = this.plantsRepository.create(createPlantDto);
    const result = await this.plantsRepository.save(plant);
    return result;
  }

  async findAll(){
    return await this.plantsRepository.find();
  }

  async findOne(id: number) {

    const found = await this.plantsRepository.findOneBy({id})
    if(!found){
      throw new Error(`Plante avec l'id numéro ${id} pas trouvé`);
    }
    return found;
  }

  async update(id: number, updatePlantDto: UpdatePlantDto) {
    await this.plantsRepository.update(id, updatePlantDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const plantToRemove = await this.findOne(id);
    if (!plantToRemove) {
      throw new Error(`Plante avec l'id numéro ${id} pas trouvé`);
    }
    await this.plantsRepository.remove(plantToRemove);
    return { message: `La plante  ${plantToRemove.nom} est bien supprimé ` };
  }

  async createPlantWithImage(plantData: CreatePlantDto, imagePath: string): Promise<Plant> {
    const newPlant = this.plantsRepository.create({
      ...plantData,
      image: imagePath
    });

    return await this.plantsRepository.save(newPlant);
  }

}
