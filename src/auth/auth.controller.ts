import { Controller, HttpStatus } from '@nestjs/common';
import { Body, Get, HttpCode, Post, UseGuards } from '@nestjs/common/decorators';
import { LoginRequestDto } from 'src/requestModels/loginRequest';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt.authGuard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService,
                private readonly userService:UserService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    login(@Body() loginRequest: LoginRequestDto) :any {
        let result =  this.authService.login(loginRequest.email, loginRequest.password);
        if(result){
            return result;
        }
        return HttpStatus.UNAUTHORIZED;
    }

    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Get('me')
    me(email:string) {
        let result =  this.userService.findByEmail(email);
        if(result){
            return result;
        }
        return HttpStatus.UNAUTHORIZED;
    }
}
