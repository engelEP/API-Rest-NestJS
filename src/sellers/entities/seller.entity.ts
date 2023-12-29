import { Invoice } from "src/invoices/entities/invoice.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Seller {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    lastName: string;

    @OneToMany(() => Invoice, (invoice) => invoice.seller)
    invoices: Invoice[];
}
