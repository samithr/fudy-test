 import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/entities/user.entity';
import { v4 } from "uuid";

@Injectable()
export class UserService extends TypeOrmCrudService<User> {

    constructor(@InjectRepository(User) repo, private authService: AuthService) {
        super(repo) 
    }

    findByEmail(email: string): Promise<User | undefined> {
        return this.repo.findOne({ 
            select: {id: true, email:true},
            where: { 
                email: email
            } 
          });
    }

    async createUser(email:string, paasword:string) : Promise<User>{
        let securityStamp: string = v4();
        var passwordHash = await this.authService.hashPassword(paasword, securityStamp);
        let user = new User();
        user.email = email;
        user.password = passwordHash;
        user.securityStamp = securityStamp;
        return this.repo.create(user);
    }
} 
