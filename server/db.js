import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'project_submission',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASSWORD || '1525',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    port: process.env.DB_PORT || 5432,
  }
);

export default sequelize;
