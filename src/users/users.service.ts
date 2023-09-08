import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';


@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) { }
  
  async create(createUserDto: CreateUserDto): Promise<User> {
    // try {
    //   const { password, ...rest } = createUserDto;

    //   // Hachage du mot de passe
    //   const saltRounds = 10;
    //   const hashedPassword = await bcrypt.hash(createUserDto.password, saltRounds);

    //   // Création de l'utilisateur avec le mot de passe haché
    //   const nouvelUtilisateur = this.utilisateursRepository.create({
    //     ...rest,
    //     password: hashedPassword,
    //   });

    //   return this.utilisateursRepository.save(nouvelUtilisateur);
    // } catch (err) {
    //   if (err.code === '23505') {
    //     throw new HttpException('L\'email ou le nom d\'utilisateur existe déjà', HttpStatus.BAD_REQUEST);
    //   } else {
    //     console.error("Erreur lors de la création de l'utilisateur:", err);
    //     throw new InternalServerErrorException('Erreur lors de la création de l\'utilisateur');
    //   }
    // }

    const newUser = this.usersRepository.create(createUserDto);
    const createdUser = await this.usersRepository.save(newUser);
    return createdUser;
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  async findOne(id: number) {
    const found = await this.usersRepository.findOneBy({ id })
    if (!found) {
      throw new Error(`Plante avec l'id numéro ${id} pas trouvé`);
    }
    return found;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.usersRepository.update(id, updateUserDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const userToRemove = await this.findOne(id);
    if (!userToRemove) {
      throw new Error(`usere avec l'id numéro ${id} pas trouvé`);
    }
    await this.usersRepository.remove(userToRemove);
    return { message: `La usere  ${userToRemove.name} est bien supprimé ` };
  }

}
