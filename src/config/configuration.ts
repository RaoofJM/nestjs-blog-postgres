export interface Configs {
  PORT: number;
  DATABASE_URL: string;
  JWT_SECRET: string;
  TOKEN_VALIDATION_SEC: string;
  REDIS_HOST: string;
  REDIS_PORT: string;
}

export default (): Configs => ({
  PORT: Number(process.env.PORT),
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  TOKEN_VALIDATION_SEC: process.env.TOKEN_VALIDATION_SEC,
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT,
});
