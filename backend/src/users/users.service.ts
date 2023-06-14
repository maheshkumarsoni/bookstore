import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compare, genSalt, hash } from 'bcrypt';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async generatePassword(password: string) {
    const salt = await genSalt();
    return await hash(password, salt);
  }

  async create(createUserDto: CreateUserDto) {
    const pswdHash = await this.generatePassword(createUserDto.password);
    const newUser = this.usersRepository.create({
      ...createUserDto,
      password: pswdHash,
    });
    return this.usersRepository.save(newUser);
  }

  findAll() {
    return this.usersRepository.find({
      select: ['id', 'name', 'email', 'points'],
      relations: ['orders'],
    });
  }

  findOne(where: FindOptionsWhere<User>) {
    return this.usersRepository.findOne({
      where,
      select: ['id', 'name', 'email', 'points'],
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user?.id) {
      throw new NotFoundException();
    }
    if (updateUserDto.password && updateUserDto.oldPassword) {
      const isMatch = await compare(updateUserDto.oldPassword, user.password);
      if (!isMatch) {
        throw new UnauthorizedException();
      }
      updateUserDto.password = await this.generatePassword(
        updateUserDto.password,
      );
      delete updateUserDto.oldPassword;
    } else {
      delete updateUserDto.password;
    }
    return this.usersRepository.save({ ...user, ...updateUserDto });
  }

  async remove(id: number) {
    const user = await this.findOne({ id });
    return this.usersRepository.remove(user);
  }
}
