import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { UserRole } from "./enum";

@Entity({ name: "tbl_user" })
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column({ type: "varchar", length: 255 })
  email: string;

  @Column({ type: "varchar", length: 255 })
  password: string;

  @Column({ type: "enum", enum: UserRole, default: UserRole.USER })
  role: UserRole;
}
