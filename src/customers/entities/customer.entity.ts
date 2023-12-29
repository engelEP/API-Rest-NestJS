import { Invoice } from "src/invoices/entities/invoice.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Customer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    lastName: string;

    @Column()
    address: string;

    @Column()
    phone: number;

    @OneToMany(() => Invoice, (invoice) => invoice.customer)
    invoices: Invoice[]
}
