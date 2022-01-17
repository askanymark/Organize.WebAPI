import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { LocalAuth } from './auth/guards/local-auth';
import { Public } from './constants';

@Controller()
export class AppController {
  constructor(private readonly _authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuth)
  @Post('auth/login')
  async login(@Request() req) {
    return this._authService.login(req.user);
  }
}
