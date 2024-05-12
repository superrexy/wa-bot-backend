import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { PrismaService } from 'nestjs-prisma';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private i18n: I18nService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const isEmailExist = await this.findOneByEmail(createUserDto.email, false);
    if (isEmailExist)
      throw new ConflictException(this.i18n.t('message.EMAIL_CONFLICT'));

    const data = await this.prisma.user.create({
      data: { ...createUserDto },
    });

    return data;
  }

  async findAll() {
    const data = await this.prisma.user.findMany();

    return data;
  }

  async findOneByID(id: number, throwException = true) {
    const data = await this.prisma.user.findFirst({
      where: {
        id,
      },
    });

    if (!data && throwException)
      throw new NotFoundException(this.i18n.t('message.USER_NOT_FOUND'));

    return data;
  }

  async findOneByEmail(email: string, throwException = true) {
    const data = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!data && throwException)
      throw new NotFoundException(this.i18n.t('message.USER_NOT_FOUND'));

    return data;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOneByID(id);

    if (updateUserDto.email) {
      if (user.email !== updateUserDto.email) {
        const isEmailExist = await this.findOneByEmail(updateUserDto.email);
        if (isEmailExist) throw new ConflictException('Email already exist');
      }
    }

    const data = await this.prisma.user.update({
      where: {
        id,
      },
      data: { ...updateUserDto },
    });

    return data;
  }

  async remove(id: number) {
    const user = await this.findOneByID(id);

    const data = await this.prisma.user.delete({
      where: {
        id: user.id,
      },
    });

    return data;
  }
}
