import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('project_submission', 'postgres', '1525', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
});

export default sequelize;
