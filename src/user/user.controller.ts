import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './classes';

@Controller('user')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Post()
  async create(@Body() userDto: User): Promise<User> {
    const exists = await this._userService.exists(userDto.userName);

    if (exists) {
      throw new BadRequestException('Username already exists');
    }

    return this._userService.register(userDto);
  }

  @Get()
  async find(): Promise<User[]> {
    return this._userService.find();
  }

  @Get(':id')
  async get(@Param('id') id: string): Promise<User> {
    const user = await this._userService.get(parseInt(id, 10));

    if (typeof user === 'undefined') {
      throw new NotFoundException();
    }

    return user;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() userDto: User): Promise<User> {
    const user = await this._userService.update(parseInt(id, 10), userDto);

    if (typeof user === 'undefined') {
      throw new NotFoundException();
    }

    return user;
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    const success = await this._userService.remove(parseInt(id, 10));

    if (!success) {
      throw new NotFoundException();
    }
  }

  @Post('login')
  async login(@Body() loginDto: { userName: string; password: string }): Promise<any> {
    return this._userService.login(loginDto.userName, loginDto.password);
  }
}
