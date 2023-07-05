import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Way } from "./way.entity";
import { User } from "./user.entity";

@Entity('taxi')
export class Taxi {
    @PrimaryGeneratedColumn()
    taxi_id: number;

    @Column({ length: 30, unique: true })
    email: string;

    @Column({ length: 5 })
    name: string;

    @Column({ length: 11, unique: true })
    phone: string;

    @Column()
    password: string;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;

    @OneToMany(() => Way, (way) => way.taxi)
    way: Way[];
    
    @OneToOne(() => User, (user) => user.taxi, { nullable: false })
    @JoinColumn({ name: 'taxi_id' })
    user: User;
}