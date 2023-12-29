import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invoice } from './entities/invoice.entity';
import { Customer } from 'src/customers/entities/customer.entity';
import { Seller } from 'src/sellers/entities/seller.entity';

@Injectable()
export class InvoicesService {
  constructor(
    @InjectRepository(Invoice)
    private invoicesRepository: Repository<Invoice>,
    
    @InjectRepository(Customer)
    private customersRepository: Repository<Customer>,

    @InjectRepository(Seller)
    private sellersRepository: Repository<Seller>,
  ) {}

  async create(createInvoiceDto: CreateInvoiceDto) {
    const { customerId, sellerId, ...rest } = createInvoiceDto;
    const customer = await this.customersRepository.findOneBy({ id: customerId });
    const seller = await this.sellersRepository.findOneBy({ id: sellerId });

    if (!customer) 
      throw new BadRequestException('Customer not found');

    if (!seller)
      throw new BadRequestException('Seller not found');

    const invoice = this.invoicesRepository.create({
      ...rest,
      seller,
      customer
    });

    return await this.invoicesRepository.save(invoice);
  }

  async findAll() {
    return this.invoicesRepository.find({
      relations: {
        seller: true,
        customer: true,
        invoiceDetails: true
      }
    });
  }

  findOne(id: number) {
    return this.invoicesRepository.findOne({
      where: { id },
      relations: {
        seller: true,
        customer: true,
        invoiceDetails: {
          product: true,
        }
      }
    });
  }

  async update(id: number, updateInvoiceDto: UpdateInvoiceDto) {
    const { sellerId, customerId, ...rest } = updateInvoiceDto;
    const invoice =  await this.invoicesRepository.findOneBy({ id });

    if (!invoice)
      throw new BadRequestException('Invoice not found');

    let customer;
    if(customerId) {
      customer = await this.customersRepository.findOneBy({ id: customerId });

      if (!customer)
        throw new BadRequestException('Customer not found');
    }

    let seller;
    if(sellerId) {
      seller = await this.sellersRepository.findOneBy({ id: sellerId });

      if (!seller)
        throw new BadRequestException('Seller not found');
    }

    return await this.invoicesRepository.save({
      ...invoice,
      ...rest,
      customer,
      seller
    });
  }

  remove(id: number) {
    return this.invoicesRepository.delete(id);
  }
}
