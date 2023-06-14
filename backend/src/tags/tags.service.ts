import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './entities/tag.entity';

@Injectable()
export class TagsService {
  constructor(@InjectRepository(Tag) private tagsRepository: Repository<Tag>) {}

  create(createTagDto: CreateTagDto) {
    const newTag = this.tagsRepository.create(createTagDto);
    return this.tagsRepository.save(newTag);
  }

  findAll() {
    return this.tagsRepository.find();
  }

  findOne(where: FindOptionsWhere<Tag>) {
    return this.tagsRepository.findOne({ where });
  }

  async update(id: number, updateTagDto: UpdateTagDto) {
    const tag = await this.findOne({ id });
    return this.tagsRepository.save({ ...tag, ...updateTagDto });
  }

  async remove(id: number) {
    const tag = await this.findOne({ id });
    return this.tagsRepository.remove(tag);
  }
}
