export enum ENV {
  NODE_ENV = 'NODE_ENV',
  JWT_SECRET = 'JWT_SECRET',
  SALT_ROUNDS = 'SALT_ROUNDS',
}
export enum NODE_ENV {
  DEV = 'development',
  PROD = 'production',
  STAGING = 'staging',
}

export const JWT_EXPIRE_DURATION = '7d';

export const GROUP_BUY_TIME_LIMIT = 48;
