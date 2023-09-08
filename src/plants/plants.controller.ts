import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
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
  findAll() {
    return this.plantsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.plantsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlantDto: UpdatePlantDto) {
    return this.plantsService.update(+id, updatePlantDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.plantsService.remove(+id);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('image', { dest: 'uploads' }))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Body() plantData: CreatePlantDto): Promise<any> {
    console.log(file)
    console.log(plantData);
    const imagePath = file.path + '.jpg';
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
