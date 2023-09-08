import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Res, NotFoundException } from '@nestjs/common';
import { PlantsService } from './plants.service';
import { CreatePlantDto } from './dto/create-plant.dto';
import { UpdatePlantDto } from './dto/update-plant.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Plant } from './entities/plant.entity';
import path from 'path';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

@Controller('plants')
@ApiTags('plants')
export class PlantsController {
  constructor(private readonly plantsService: PlantsService) { }

  @Post()
  create(@Body() createPlantDto: CreatePlantDto) {
    return this.plantsService.create(createPlantDto);
  }

  @Get()
  async findAll() {
    return await this.plantsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const found = await this.plantsService.findOne(+id);
    if (!found) {
      throw new NotFoundException(`Plante avec l'id numéro ${id} pas trouvé`);
    }
    return found;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePlantDto: UpdatePlantDto) {
    await this.plantsService.update(+id, updatePlantDto);
    return await this.plantsService.findOne(+id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.plantsService.remove(+id);
    if (!result) {
      throw new NotFoundException(`Plante avec l'id numéro ${id} pas trouvé`);
    }
    return result;
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('image', { dest: 'uploads' }))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Body() plantData: CreatePlantDto): Promise<any> {
    console.log(file)
    console.log(plantData);
    const imagePath = file.filename;
    const newPlant = await this.plantsService.createPlantWithImage(plantData, imagePath);
    return newPlant;
  }

  

  @Get(':imageName')
  async serveImage(@Param('imageName') imageName: string, @Res() res: Response) {
    // res.sendFile(imageName, { root: path.join(__dirname, '..', 'uploads') });
    const filePath = path.join(__dirname, '..', 'uploads', imageName);
    //configuration du typage image
    res.setHeader('Content-type', 'jpeg')
    return res.sendFile(filePath);
  }
}
