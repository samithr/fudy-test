import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { CrudController } from '@nestjsx/crud';
import { JwtAuthGuard } from 'src/auth/jwt.authGuard';
import { User } from 'src/entities/user.entity';
import { LoginRequestDto } from 'src/requestModels/loginRequest';
import { UserService } from './user.service';

@Controller('user')
export class UserController implements CrudController<User> {
    authService: any;

    constructor(public service:UserService) {
        
    }

    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Post('user')
    login(@Body() loginRequest: LoginRequestDto) :any {
        let result =  this.service.createUser(loginRequest.email, loginRequest.password);
        if(result){
            return result;
        }
        return HttpStatus.UNAUTHORIZED;
    }
}
