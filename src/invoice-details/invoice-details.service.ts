import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateInvoiceDetailDto } from './dto/create-invoice-detail.dto';
import { UpdateInvoiceDetailDto } from './dto/update-invoice-detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InvoiceDetail } from './entities/invoice-detail.entity';
import { Product } from 'src/products/entities/product.entity';
import { Invoice } from 'src/invoices/entities/invoice.entity';

@Injectable()
export class InvoiceDetailsService {
  constructor(
    @InjectRepository(InvoiceDetail)
    private invoiceDetailsRepository: Repository<InvoiceDetail>,
    
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,

    @InjectRepository(Invoice)
    private InvoicesRepository: Repository<Invoice>,
  ) {}

  async create(createInvoiceDetailDto: CreateInvoiceDetailDto) {
    const { productId, invoiceId, ...rest } = createInvoiceDetailDto;
    const product = await this.productsRepository.findOneBy({ id: productId });
    const invoice = await this.InvoicesRepository.findOneBy({ id: invoiceId });

    if(!product)
      throw new BadRequestException('Product not found');

    if(!invoice)
      throw new BadRequestException('Invoice not found');

    const invoiceDetail = this.invoiceDetailsRepository.create({
      ...rest,
      product,
      invoice
    })

    return this.invoiceDetailsRepository.save(invoiceDetail);
  }

  findAll() {
    return this.invoiceDetailsRepository.find({
      relations: {
        invoice: true,
        product: true
      }
    });
  }

  findOne(id: number) {
    return this.invoiceDetailsRepository.findOne({
      where: { id },
      relations: {
        invoice: true,
        product: true
      }
    });
  }

  async update(id: number, updateInvoiceDetailDto: UpdateInvoiceDetailDto) {
    const { productId, invoiceId, ...rest } = updateInvoiceDetailDto;
    const invoiceDetail = await this.invoiceDetailsRepository.findOneBy({ id });

    if(!invoiceDetail)
      throw new BadRequestException('Invoice Details not found');

    let invoice;
    if(invoiceId) {
      invoice = await this.InvoicesRepository.findOneBy({ id: invoiceId });

      if(!invoice)
        throw new BadRequestException('Invoice not found');
    }

    let product;
    if(productId) {
      product = await this.productsRepository.findOneBy({ id: productId });

      if(!product)
        throw new BadRequestException('Product not found');
    }

    return await this.invoiceDetailsRepository.save({
      ...invoiceDetail,
      ...rest,
      product,
      invoice
    });
  }

  remove(id: number) {
    return this.invoiceDetailsRepository.delete(id);
  }
}
