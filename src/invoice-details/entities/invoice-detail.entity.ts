import { Invoice } from "src/invoices/entities/invoice.entity";
import { Product } from "src/products/entities/product.entity";
import { floatTransformer } from "src/utils/floatTransformer";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class InvoiceDetail {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        transformer: new floatTransformer()
    })
    quantity: number;

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        transformer: new floatTransformer()
    })
    price: number;

    @ManyToOne(() => Invoice, (invoice) => invoice.invoiceDetails)
    invoice: Invoice;

    @ManyToOne(() => Product, (product) => product.invoicesDetails)
    product: Product;
}
