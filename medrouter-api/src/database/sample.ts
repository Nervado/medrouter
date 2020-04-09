/**

import { MigrationInterface, QueryRunner, Table } from 'typeorm';

import MigrationUtil from '../../util/migrationUtil';

export class CreateUserTable1584290025856 implements MigrationInterface {
  private static readonly table = new Table({
    name: 'UserTable',
    columns: [
      ...MigrationUtil.getIDColumn(),
      MigrationUtil.getVarCharColumn({ name: 'username' }),
      MigrationUtil.getVarCharColumn({ name: 'surname', isNullable: true }),
      MigrationUtil.getVarCharColumn({ name: 'email', isUnique: true }),
      MigrationUtil.getVarCharColumn({ name: 'cpf', isNullable: true }),
      MigrationUtil.getVarCharColumn({ name: 'phonenumber', isNullable: true }),
      MigrationUtil.getVarCharColumn({ name: 'street', isNullable: true }),
      MigrationUtil.getVarCharColumn({ name: 'housenumber', isNullable: true }),
      MigrationUtil.getVarCharColumn({ name: 'complement', isNullable: true }),
      MigrationUtil.getVarCharColumn({ name: 'neibehoord', isNullable: true }),
      MigrationUtil.getVarCharColumn({ name: 'city', isNullable: true }),
      MigrationUtil.getVarCharColumn({ name: 'uf', isNullable: true }),
      MigrationUtil.getVarCharColumn({ name: 'cep', isNullable: true }),
      MigrationUtil.getVarCharColumn({ name: 'password' }),
      MigrationUtil.getVarCharColumn({ name: 'salt' }),
      MigrationUtil.getBoleanColumn({ name: 'admin' }),
      MigrationUtil.getBoleanColumn({ name: 'ispro' }),
      MigrationUtil.getUUidColumn({ name: 'photoId' }),
    ],
  });

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(CreateUserTable1584290025856.table);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable(CreateUserTable1584290025856.table);
  }
}


 */
