import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../../database/models/entities';
import { Repository } from 'typeorm';
import { RegisterDto, RegisterResponseDto } from './dtos/register.dto';
import { ApiError } from '../../common/classes/api-error';
import { ErrorCode } from '../../common/constants/errors';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import config from '../../common/services/config.service';
import { LoginDto, LoginResponseDto } from './dtos/login.dto';

export class AuthService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async validateUserById(id: string): Promise<Users | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async register(user: RegisterDto): Promise<RegisterResponseDto> {
    const existedUser = await this.usersRepository.findOneBy({
      email: user.email,
    });
    if (existedUser) throw ApiError.error(ErrorCode.EXISTED_USER);

    const existedPhoneNumber = await this.usersRepository.findOneBy({
      phone: user.phone,
    });
    if (existedPhoneNumber) throw ApiError.error(ErrorCode.USED_PHONE_NUMBER);

    const newUser = this.usersRepository.create(user);
    const { id, email, phone, role } = await this.usersRepository.save(newUser);
    const token = jwt.sign({ id, email, phone, role }, config.JWT_SECRET, {
      expiresIn: config.JWT_EXPIRE_TIME,
    });

    return {
      id,
      email,
      phone,
      role,
      token,
    };
  }

  async login(request: LoginDto): Promise<LoginResponseDto> {
    const { email, password } = request;
    const user = await this.usersRepository.findOneBy({
      email: email,
    });
    if (!user) throw new ApiError.error(ErrorCode.INVALID_EMAIL);
    const isValidPassword = bcrypt.compareSync(password, user.password);
    if (!isValidPassword) throw ApiError.error(ErrorCode.INVALID_PASSWORD);

    const token = jwt.sign(
      { id: user.id, email: user.email, phone: user.phone, role: user.role },
      config.JWT_SECRET,
      {
        expiresIn: config.JWT_EXPIRE_TIME,
      },
    );

    return { token };
  }
}
