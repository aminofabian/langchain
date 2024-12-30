import * as dotenv from 'dotenv';

dotenv.config({
  path: `${process.cwd()}/src/config/env/${process.env.NODE_ENV}.env`,
});

export const envConfigs: IConfigs = {
  appPort: Number(process.env.BACKEND_PORT),
  nodeEnv: process.env.NODE_ENV,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  jwt: {
    secret:
      process.env.JWT_SECRET ||
      '8P6zqhV2ByRYDBQ1n9mkRP9oqfgVbFbGPtMRUZyXmijRV7rV9x6G5uQNSaCXWGF6',
    expirationTime: process.env.JWT_EXPIRATION_TIME || '1d',
    expirationRefreshTime: process.env.JWT_EXPIRATION_REFRESH_TIME || '4d',
  },
};

console.log('envConfigs', JSON.stringify(envConfigs, null, 2));

export type MailConfig = {
  host: string;
  port: number;
  user: string;
  pass: string;
  from: string;
};

export type DatabaseConfig = {
  type: string;
  host: string;
  port: number;
  username: string;
  password: string;
  name: string;
  sync: boolean;
  logging: boolean;
};

export type JwtConfig = {
  secret: string;
  expirationTime: string;
  expirationRefreshTime: string;
};

export type ThrottleConfig = {
  ttl: number;
  limit: number;
};
export type RedisConfig = {
  host: string;
  port: number;
  url: string;
  password?: string;
};

export type IConfigs = {
  appPort?: number;
  nodeEnv?: string;
  mail?: MailConfig;
  database?: DatabaseConfig;
  jwt?: JwtConfig;
  throttle?: ThrottleConfig;
  redis?: RedisConfig;
  firebase?: FirebaseAccountConfig;
  OPENAI_API_KEY?: string;
};

export type FirebaseAccountConfig = {
  pathToJson: string;
};
