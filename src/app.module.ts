import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { InvoicesModule } from './invoices/invoices.module';
import { ProductsModule } from './products/products.module';
import { SellersModule } from './sellers/sellers.module';
import { CustomersModule } from './customers/customers.module';
import { InvoiceDetailsModule } from './invoice-details/invoice-details.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3307,
      username: "root",
      password: "admin",
      database: "nestDB",
      autoLoadEntities: true,
      synchronize: true,
    }),
    InvoicesModule,
    ProductsModule,
    SellersModule,
    CustomersModule,
    InvoiceDetailsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
