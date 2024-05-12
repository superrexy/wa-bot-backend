import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ApiMessage } from '../common/decorators/api-message.decorators';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Create user' })
  @ApiMessage('message.SUCCESS_CREATE_USER')
  @ApiCreatedResponse({ type: UserEntity })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const data = await this.usersService.create(createUserDto);

    return Promise.resolve(new UserEntity(data));
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiMessage('message.SUCCESS_SHOW_USERS')
  @ApiOkResponse({ type: UserEntity, isArray: true })
  @Get()
  async findAll() {
    const data = await this.usersService.findAll();

    return Promise.all(data.map((user) => new UserEntity(user)));
  }

  @ApiOperation({ summary: 'Get user by id' })
  @ApiMessage('message.SUCCESS_SHOW_USER')
  @ApiOkResponse({ type: UserEntity })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.usersService.findOneByID(+id);

    return Promise.resolve(new UserEntity(data));
  }

  @ApiOperation({ summary: 'Update user by id' })
  @ApiMessage('message.SUCCESS_UPDATE_USER')
  @ApiOkResponse({ type: UserEntity })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const data = await this.usersService.update(+id, updateUserDto);

    return Promise.resolve(new UserEntity(data));
  }

  @ApiOperation({ summary: 'Remove user by id' })
  @ApiMessage('message.SUCCESS_DELETE_USER')
  @ApiOkResponse({ type: UserEntity })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const data = await this.usersService.remove(+id);

    return Promise.resolve(new UserEntity(data));
  }
}
