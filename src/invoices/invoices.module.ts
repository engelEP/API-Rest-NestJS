import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { InvoicesService } from './invoices.service';
import { InvoicesController } from './invoices.controller';
import { Invoice } from './entities/invoice.entity';
import { CustomersService } from 'src/customers/customers.service';
import { CustomersModule } from 'src/customers/customers.module';
import { SellersService } from 'src/sellers/sellers.service';
import { SellersModule } from 'src/sellers/sellers.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Invoice]),
    CustomersModule,
    SellersModule
  ],
  controllers: [InvoicesController],
  providers: [InvoicesService, CustomersService, SellersService],
  exports: [TypeOrmModule]
})
export class InvoicesModule {}
