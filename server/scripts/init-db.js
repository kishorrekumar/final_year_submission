import sequelize from '../db.js';
import User from '../models/User.js';
import Submission from '../models/Submission.js';
import { seedAdminUser } from '../controllers/authController.js';

const initializeDatabase = async () => {
  try {
    console.log('Connecting to database...');
    await sequelize.authenticate();
    console.log('Database connection established successfully.');

    console.log('Creating tables...');
    await sequelize.sync({ force: false, alter: true });
    console.log('Tables created/updated successfully.');

    console.log('Seeding admin user...');
    await seedAdminUser();
    console.log('Database initialization completed successfully.');

    process.exit(0);
  } catch (error) {
    console.error('Database initialization failed:', error);
    process.exit(1);
  }
};

initializeDatabase();
