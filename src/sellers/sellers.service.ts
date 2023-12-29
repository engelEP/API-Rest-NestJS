import { Injectable } from '@nestjs/common';
import { CreateSellerDto } from './dto/create-seller.dto';
import { UpdateSellerDto } from './dto/update-seller.dto';
import { Seller } from './entities/seller.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SellersService {
  constructor(
    @InjectRepository(Seller)
    private sellersRepository: Repository<Seller>,
  ) {}

  async create(createSellerDto: CreateSellerDto) {
    const seller = this.sellersRepository.create(createSellerDto);
    return await this.sellersRepository.save(seller);
  }

  findAll() {
    return this.sellersRepository.find({
      relations: {
        invoices: true
      }
    });
  }

  findOne(id: number) {
    return this.sellersRepository.findOne({
      where: { id },
      relations: {
        invoices: {
          customer: true,
          invoiceDetails: {
            product: true
          }
        }
      }
    });
  }

  update(id: number, updateSellerDto: UpdateSellerDto) {
    return this.sellersRepository.update(id, updateSellerDto);
  }

  remove(id: number) {
    return this.sellersRepository.delete(id);
  }
}
