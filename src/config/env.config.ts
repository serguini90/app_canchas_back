export const EnvConfiguration = () => ({
    ENVIRONMENT: process.env.NODE_ENV || 'dev',
    PORT: process.env.PORT || 3002,
    DATABASE_HOST: process.env.DATABASE_HOST || 'db4free.net',    
    DATABASE_PORT: process.env.DATABASE_PORT || '3306',    
    DATABASE_USER: process.env.DATABASE_USER || 'sintenticas',    
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD || 'sinteticas',   
    DATABASE_NAME: process.env.DATABASE_NAME || 'cancha_sintetica',
    JWT_SECRET: process.env.JWT_SECRET || 'adasdasd2312312dsadsadasda123',
    EXPIRES_IN: process.env.EXPIRES_IN || '1h',
    MAIL_API_KEY: process.env.MAIL_API_KEY || 'xsmtpsib-be0de2f908c85ab7f40db2ba870eef6bbeaa93c8aad5e50ba99a1d34031b92f7-KmHNyj68tSgqPcZR',
    MAIL_USER: process.env.MAIL_USER || 'serguini90@gmail.com'
});
