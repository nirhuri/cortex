import { Injectable, ConflictException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>
  ) {}

  async signup(email: string, password: string) {
    const exists = await this.userRepo.findOne({ where: { email } });
    if (exists) throw new ConflictException("Email already in use");

    const hash = await bcrypt.hash(password, 10);
    const user = this.userRepo.create({ email, password: hash });
    return this.userRepo.save(user);
  }
}