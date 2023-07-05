import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { CreateUserDTO } from './dto/user.dto';
import { UserRepository } from './user.repository';
import { generateHash } from 'src/shared/hash';

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
    ) {}
    
    public async signUp(createUserDto: CreateUserDTO): Promise<User> {
        const user = await this.userRepository.findOneUserByEmail(createUserDto.email);
        
        if(user) throw new ConflictException('email already exists');
        
        const hashedPassword = generateHash(createUserDto.password);
        const newCreateUserDto: CreateUserDTO = { ...createUserDto, password: hashedPassword };

        return await this.userRepository.createUser(newCreateUserDto);
    }

    public async getOneUserById(user_id: number): Promise<User> {
        const user =  await this.userRepository.getOneUserById(user_id);

        if(!user) throw new NotFoundException('Not Found user');

        return user;
    }
}
