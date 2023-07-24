import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CatsRepository } from 'src/cats/cats.repository';
import { LoginRequestDto } from './dto/login.request.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly catsRepository: CatsRepository,
    private jwtService: JwtService,
  ) {}
  async jwtLogIn(data: LoginRequestDto) {
    const { email, password } = data;

    //* 입력한 email이 존재하는지 확인
    const cat = await this.catsRepository.findCatByEmail(email);

    if (!cat) {
      throw new UnauthorizedException('이메일, 비밀번호 확인해주세요.');
    }

    //* 입력한 비밀번호가 맞는지 확인
    const isPasswordValidated: boolean = await bcrypt.compare(
      password,
      cat.password,
    );

    if (!isPasswordValidated) {
      throw new UnauthorizedException('비밀번호 오류');
    }

    //* jwt token 발행
    const payload = { email: email, sub: cat.id };

    return {
      token: this.jwtService.sign(payload),
    };
  }
}
