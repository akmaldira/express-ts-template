import { appConfig } from "@config/environments";
import AppDataSource from "@database/datasource";
import { UserRole } from "@entities/enum";
import User from "@entities/user.entity";
import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from "@exceptions/index";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Repository } from "typeorm";

export default class AuthService {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async login(email: string, password: string) {
    const user = await this.repository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException("User not found");
    }
    if (user.password !== password) {
      throw new UnauthorizedException("Invalid password");
    }

    return this.generateToken(user);
  }

  async register(email: string, password: string) {
    const user = await this.repository.findOne({ where: { email } });
    if (user) {
      throw new BadRequestException("Email already exists");
    }

    const newUser = new User();
    newUser.email = email;
    newUser.password = await this.hashPassword(password);
    await newUser.save();

    // Create your own logic (eg: send email to user)
    return this.generateToken(newUser);
  }

  private generateToken(user: User): string {
    const token = jwt.sign({ id: user.id }, appConfig.JWT_SECRET, {
      expiresIn: 86400,
    });
    return token;
  }

  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async verifyToken(role: UserRole, token: string) {
    try {
      const decoded = jwt.verify(token, appConfig.JWT_SECRET) as { id: string };
      const user = await this.repository.findOneBy({ id: decoded.id });
      if (!user) {
        throw new UnauthorizedException("Unauthorized");
      }
      return user;
    } catch (error) {
      throw new UnauthorizedException("Unauthorized");
    }
  }
}
