import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private booksRepository: Repository<Book>,
  ) {}

  create(createBookDto: CreateBookDto) {
    const newBook = this.booksRepository.create(createBookDto);
    return this.booksRepository.save(newBook);
  }

  // findAll() {
  // return this.booksRepository.find();
  // }
  async findAll(page: number, limit: number) {
    const skip = (page - 1) * limit;

    const [result, total] = await this.booksRepository.findAndCount({
      relations: ['tags'],
      skip,
      take: limit,
    });
    return { result, total };
  }

  findOne(id: number) {
    return this.booksRepository.findOneBy({ id });
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    const book = await this.findOne(id);
    return this.booksRepository.save({ ...book, ...updateBookDto });
  }

  async remove(id: number) {
    const book = await this.findOne(id);
    return this.booksRepository.remove(book);
  }
}
