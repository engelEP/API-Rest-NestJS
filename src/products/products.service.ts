import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}
  
  async create(createProductDto: CreateProductDto) {
    const product = this.productsRepository.create(createProductDto);
    return await this.productsRepository.save(product);
  }

  findAll() {
    return this.productsRepository.find({
      relations: {
        invoicesDetails: true
      }
    });
  }

  findOne(id: number) {
    return this.productsRepository.findOne({
      where: { id },
      relations: {
        invoicesDetails: true
      }
    });
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.productsRepository.update(id, updateProductDto);
  }

  remove(id: number) {
    return this.productsRepository.delete(id);
  }
}
