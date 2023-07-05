import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";
import { CreateUserDTO } from "./dto/user.dto";

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    async createUser(createUserDto: CreateUserDTO): Promise<User> {
        const user = new User();

        user.email = createUserDto.email;
        user.name = createUserDto.name;
        user.caution = createUserDto.caution;
        user.password = createUserDto.password;

        return await this.userRepository.save(user);
    }

    async findOneUserByEmail(email: string): Promise<User> {
        return await this.userRepository.findOne({ where: { email } });
    }

    async getOneUserById(user_id: number): Promise<User> {
        return await this.userRepository.createQueryBuilder('user')
        .select('user.user_id')
        .addSelect('user.name')
        .addSelect('user.email')
        .addSelect('user.caution')  
        .addSelect('user.created_at')
        .addSelect('user.updated_at')    
        .where('user.user_id = :user_id', { user_id })
        .getRawOne();
    }
}