import AppDataSource from "@database/datasource";
import User from "@entities/user.entity";
import { Repository } from "typeorm";

export default class UserService {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  public async getAllUsers(): Promise<User[]> {
    return this.repository.find();
  }

  public async getUserById(id: string): Promise<User | null> {
    return this.repository.findOneBy({ id });
  }
}
