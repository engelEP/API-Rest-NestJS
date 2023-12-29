import { Module } from '@nestjs/common';
import { InvoiceDetailsService } from './invoice-details.service';
import { InvoiceDetailsController } from './invoice-details.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoicesService } from 'src/invoices/invoices.service';
import { ProductsService } from 'src/products/products.service';
import { ProductsModule } from 'src/products/products.module';
import { InvoicesModule } from 'src/invoices/invoices.module';
import { InvoiceDetail } from './entities/invoice-detail.entity';
import { CustomersModule } from 'src/customers/customers.module';
import { SellersModule } from 'src/sellers/sellers.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([InvoiceDetail]),
    ProductsModule,
    InvoicesModule,
    CustomersModule,
    SellersModule
  ],
  controllers: [InvoiceDetailsController],
  providers: [InvoiceDetailsService, InvoicesService, ProductsService],
})
export class InvoiceDetailsModule {}
