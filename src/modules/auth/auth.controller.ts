import {
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto, RegisterResponseDto } from './dtos/register.dto';
import { ApiResult } from 'src/common/classes/api-result';
import { LoginDto, LoginResponseDto } from './dtos/login.dto';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOkResponse({ type: RegisterResponseDto })
  async register(@Body() body: RegisterDto) {
    const response = await this.authService.register(body);
    return new ApiResult().success(response);
  }

  @Post('login')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOkResponse({ type: LoginResponseDto })
  async login(@Body() body: LoginDto) {
    const response = await this.authService.login(body);
    return new ApiResult().success(response);
  }
}
