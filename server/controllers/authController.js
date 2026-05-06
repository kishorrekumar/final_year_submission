import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const JWT_SECRET = 'super-secret-key-project-2k26';

export const seedAdminUser = async () => {
  try {
    const adminEmail = 'admin@project.com';
    const adminPassword = 'Project@2k26';

    const existingAdmin = await User.findOne({ where: { email: adminEmail } });
    
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      await User.create({
        email: adminEmail,
        password: hashedPassword,
      });
      console.log('Admin user seeded successfully.');
    } else {
      console.log('Admin user already exists.');
    }
  } catch (error) {
    console.error('Error seeding admin user:', error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token, message: 'Login successful' });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
