import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Way } from "./way.entity";
import { User } from "./user.entity";

@Entity('taxi')
export class Taxi {
    @PrimaryColumn()
    taxi_id: number;

    @OneToMany(() => Way, (way) => way.user)
    way: Way[];

    @OneToOne(() => User, (user) => user.taxi, { nullable: false })
    @JoinColumn({ name: 'taxi_id' })
    user: User;
}