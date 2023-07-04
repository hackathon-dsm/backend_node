import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import { Way } from "./way.entity";
import { User } from "./user.entity";

@Entity('visitor')
export class Visitor {
    @PrimaryColumn()
    visitor_id: number;

    @Column()
    caution: string;

    @OneToMany(() => Way, (way) => way.user)
    way: Way[];

    @OneToOne(() => User, (user) => user.visitor, { nullable: false })
    @JoinColumn({ name: 'visitor_id' })
    user: User;
}