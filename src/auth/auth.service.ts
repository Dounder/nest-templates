import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';

import { handleDBErrors } from './../common/helpers/exception-handler.helper';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './entities/user.entity';
import { JwtPayload } from './interfaces';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { password, ...userData } = createUserDto;

    try {
      const user = await this.userModel.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
      });
      return {
        user: { ...userData },
        token: this.getJwtToken({ id: user.id }),
      };
    } catch (error) {
      handleDBErrors(error);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    const user = await this.userModel
      .findOne({ email })
      .select('email password _id username roles');

    if (!user)
      throw new UnauthorizedException(`Invalid credentials ( ${email} )`);

    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException(`Invalid credentials ( password )`);

    return {
      _id: user._id,
      email: user.email,
      username: user.username,
      roles: user.roles,
      token: this.getJwtToken({ id: user.id }),
    };
  }

  async refreshToken(user: User) {
    return { token: this.getJwtToken({ id: user._id }) };
  }

  /**
   * Get User by term of search
   * @param term search by: username, email, id
   * @returns Model<User>
   */
  async findOneBy(term: string) {
    const user = await this.userModel.findOne({
      $or: [{ username: term }, { email: term }, { _id: term }],
      $and: [{ active: true }],
    });

    if (!user) throw new NotFoundException(`User with ${term} not found`);

    return user;
  }

  private getJwtToken(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }

  async insertUserSeed(users: CreateUserDto[]) {
    await this.userModel.deleteMany();
    await this.userModel.insertMany(users);
  }
}
