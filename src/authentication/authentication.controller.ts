import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Body,
  UseGuards,
  Get,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthenticationService } from './authentication.service';
import { GetUser } from './get-user.decorator';
import { AuthGuard } from './auth.guard';
import { LoginDto } from './dto/login.dto';

@ApiTags('login')
@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @HttpCode(HttpStatus.OK)
  @Post('siginin')
  async logIn(@Body() bodyLogin: LoginDto) {
    const { email, password } = bodyLogin;
    return await this.authenticationService.siginin(email, password);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get('profile')
  async getProfile(@GetUser() user) {
    return await this.authenticationService.getUser(user.sub);
  }
}
