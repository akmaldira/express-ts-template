const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Migration1705132220922 {
    name = 'Migration1705132220922'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TYPE "public"."tbl_user_role_enum" AS ENUM('admin', 'user')`);
        await queryRunner.query(`CREATE TABLE "tbl_user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "role" "public"."tbl_user_role_enum" NOT NULL DEFAULT 'user', CONSTRAINT "PK_1262f713cac678ecfe15460073b" PRIMARY KEY ("id"))`);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "tbl_user"`);
        await queryRunner.query(`DROP TYPE "public"."tbl_user_role_enum"`);
    }
}
