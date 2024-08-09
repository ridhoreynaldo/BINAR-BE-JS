const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const register = async (email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return await prisma.nasabah.create({
    data: {
      email,
      password: hashedPassword,
    }
  });
};

const login = async (email, password) => {
  const nasabah = await prisma.nasabah.findUnique({ where: { email } });
  if (!nasabah) throw new Error('Invalid email or password');

  const isPasswordValid = await bcrypt.compare(password, nasabah.password);
  if (!isPasswordValid) throw new Error('Invalid email or password');

  const token = jwt.sign({ nasabahId: nasabah.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return token;
};

module.exports = { register, login };
