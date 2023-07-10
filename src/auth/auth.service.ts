import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginRequestDto } from 'src/requestModels/loginRequest';

@Injectable()
export class AuthService {

    constructor(private userService: UserService, private jwtService: JwtService) {
       
    }

    async login(email:string, password:string){
        let user = await this.userService.findByEmail(email );
        if(user){
            if(await this.validatePassword(password, user.password, user.securityStamp))  
            {
                const payload = {email:user.email, sub: user.id};
                return {
                    access_tokern: await this.jwtService.signAsync(payload)
                }
            }
        }
        return null;
    }

    async validateUser(payload: string): Promise<LoginRequestDto> {
        const user = await this.userService.findByEmail(payload);    
        if (!user) {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);    
        }    
        return user;  
    }

    async validatePassword(password:string, hashedPassword:string, securityStamp:string){
        let passwordHash = await this.hashPassword(password, securityStamp);
        if(passwordHash == hashedPassword)
        {
            return true;
        }
        return false;
    }

    async hashPassword(password:string, securityStamp:string){
        return 'strig';
    }
}
