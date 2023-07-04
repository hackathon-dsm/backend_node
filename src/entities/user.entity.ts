import { Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Way } from "./way.entity";
import { Taxi } from "./taxi.entity";
import { Visitor } from "./visitor.entity";

@Entity('user')
export class User {
    @PrimaryGeneratedColumn()
    user_id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    name: string;

    @Column()
    password: string;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;

    @OneToMany(() => Way, (way) => way.user)
    way: Way[];

    @OneToOne(() =>  Taxi, (taxi) => taxi.user)
    taxi: Taxi[];

    @OneToOne(() =>  Visitor, (visitor) => visitor.user)
    visitor: Visitor[];
}