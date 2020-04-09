import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as Joi from '@hapi/joi';
import { Injectable } from '@nestjs/common';
import IEnvConfigInterface from './env-config.interface';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { JwtConfig } from './dto/jwt.interface';
import * as path from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer';

@Injectable()
export class ConfigService {
  private readonly envConfig: IEnvConfigInterface;
  // modification in the orginal code to have default path to .env files
  constructor(filePath?: string) {
    const _filePath = filePath
      ? filePath
      : `env/${process.env.NODE_ENV || 'development'}.env`;
    const config = dotenv.parse(fs.readFileSync(_filePath));
    this.envConfig = this.validateInput(config);
  }

  public getEmailReceivers() {
    return {
      general: this.envConfig.MAIL_GENERAL,
      ceo: this.envConfig.MAIL_CEO,
      cfo: this.envConfig.MAIL_CFO,
      coo: this.envConfig.MAIL_COO,
    };
  }

  public getEmailConfig() {
    return {
      transport: {
        host: this.envConfig.MAIL_HOST,
        port: this.envConfig.MAIL_PORT,
        auth: {
          user: this.envConfig.MAIL_USER,
          pass: this.envConfig.MAIL_PASS,
        },
      },
      defaults: {
        from: this.envConfig.MAIL_FROM,
      },
      template: {
        dir: path.resolve(__dirname, '..', 'emails', 'views'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
      options: {
        partials: {
          dir: path.resolve(__dirname, '..', 'emails', 'views', 'partials'),
          options: {
            strict: true,
          },
        },
      },
    };
  }
  public getRedisConfig(): { [keys: string]: string } {
    return {
      port: this.envConfig.REDIS_PORT,
      host: this.envConfig.REDIS_HOST,
    };
  }

  public getServerUrl(): string {
    return this.envConfig.SERVER_URL;
  }
  public getDocsPath(): string {
    const baseDir = path.join(__dirname, '../../');
    const _path = `${baseDir}${this.envConfig.DOCS_DIR}`;
    return _path;
  }

  public getImagesPath(): string {
    const baseDir = path.join(__dirname, '../../');
    const _path = `${baseDir}${this.envConfig.IMAGES_DIR}`;
    return _path;
  }

  public getAvatarsPath(): string {
    const baseDir = path.join(__dirname, '../../');
    const _path = `${baseDir}${this.envConfig.AVATARS_DIR}`;
    return _path;
  }
  public getOrigin(): string {
    return this.envConfig.APP_URL;
  }
  public getJwtConfig(): JwtConfig {
    const expiresIn = this.envConfig.EXPIRES_IN;
    const secret = this.envConfig.APP_SECRET;

    return {
      secret: secret,
      signOptions: {
        expiresIn: expiresIn,
      },
    };
  }

  public getMongoConfig(): string {
    return this.envConfig.MONGO_URL;
  }

  public getHttpPort(): string {
    return this.envConfig.HTTP_PORT;
  }

  public getTypeORMConfig(): TypeOrmModuleOptions {
    const baseDir = path.join(__dirname, '../');
    const entitiesPath = `${baseDir}${this.envConfig.TYPEORM_ENTITIES}`;
    const migrationPath = `${baseDir}${this.envConfig.TYPEORM_MIGRATIONS}`;
    const type: any = this.envConfig.TYPEORM_CONNECTION;
    return {
      type,
      host: this.envConfig.TYPEORM_HOST,
      username: this.envConfig.TYPEORM_USERNAME,
      password: this.envConfig.TYPEORM_PASSWORD,
      database: this.envConfig.TYPEORM_DATABASE,
      port: Number.parseInt(this.envConfig.TYPEORM_PORT, 10),
      logging: false,
      entities: [entitiesPath],
      migrations: [migrationPath],
      migrationsRun: this.envConfig.TYPEORM_MIGRATIONS_RUN === 'true',
      cli: {
        migrationsDir: this.envConfig.TYPEORM_MIGRATIONS_DIR,
        entitiesDir: this.envConfig.TYPEORM_ENTITIES_DIR,
      },
      synchronize: this.envConfig.TYPEORM_SYNCHRONIZE === 'true',
    };
  }

  /*
	  Ensures all needed variables are set, and returns the validated JavaScript object
	  including the applied default values.
  */
  private validateInput(envConfig: IEnvConfigInterface): IEnvConfigInterface {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string()
        .valid('development', 'test')
        .default('development'),
      HTTP_PORT: Joi.number().required(),
    }).unknown(true);

    const { error, value: validatedEnvConfig } = envVarsSchema.validate(
      envConfig,
    );
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
  }
}

export const configService = new ConfigService();
