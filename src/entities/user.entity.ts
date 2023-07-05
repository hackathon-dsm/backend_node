import { Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Way } from "./way.entity";
import { Taxi } from "./taxi.entity";

@Entity('user')
export class User {
    @PrimaryGeneratedColumn()
    user_id: number;

    @Column({ length: 30, unique: true })
    email: string;

    @Column({ length: 5 })
    name: string;

    @Column({ length: 100 })
    caution: string;

    @Column()
    password: string;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;

    @OneToOne(() =>  Taxi, (taxi) => taxi.user)
    taxi: Taxi[];

    @OneToMany(() => Way, (way) => way.taxi)
    way: Way[];
}