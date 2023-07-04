import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";
import { Taxi } from "./taxi.entity";

@Entity('way')
export class Way {
    @PrimaryGeneratedColumn()
    way_id: number;

    @Column()
    departure: string;

    @Column()
    destination: string;

    @Column({ name: 'user_id' })
    user_id: number;

    @Column({ name: 'taxi_id' })
    taxt_id: number;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;

    @ManyToOne(() => User, (user) => user.way, { nullable: false })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => Taxi, (taxi) => taxi.way, { nullable: false })
    @JoinColumn({ name: 'taxi_id' })
    taxi: Taxi;
}