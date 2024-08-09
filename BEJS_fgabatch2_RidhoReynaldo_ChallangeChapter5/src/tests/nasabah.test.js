const request = require('supertest');
const app = require('../app'); // Adjust the path to your app file
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();
const SECRET_KEY = process.env.SECRET_KEY;

describe('Nasabah Endpoints', () => {
  let token;
  let nasabahId;

  beforeAll(async () => {
    const uniqueEmail = `test${Date.now()}@example.com`; // Membuat email unik
    const hashedPassword = await bcrypt.hash('password', 10);
    const user = await prisma.nasabah.create({
      data: {
        email: uniqueEmail,
        password: hashedPassword,
      },
    });
    token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
    nasabahId = user.id;
  });

  afterAll(async () => {
    await prisma.transaksi.deleteMany(); // Jika ada transaksi yang perlu dihapus
    await prisma.profile.deleteMany();
    await prisma.nasabah.deleteMany();
    await prisma.$disconnect();
  });

  it('should get all nasabah', async () => {
    const res = await request(app).get('/nasabah').set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should get a single nasabah by ID', async () => {
    const res = await request(app).get(`/nasabah/${nasabahId}`).set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id', nasabahId);
  });

  it('should create a new nasabah', async () => {
    const res = await request(app).post('/nasabah').set('Authorization', `Bearer ${token}`).send({
      email: 'newnasabah@example.com',
      password: 'newpassword',
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('email', 'newnasabah@example.com');
  });

  it('should update an existing nasabah', async () => {
    const res = await request(app).put(`/nasabah/${nasabahId}`).set('Authorization', `Bearer ${token}`).send({
      email: 'updatednasabah@example.com',
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('email', 'updatednasabah@example.com');
  });

  it('should delete a nasabah', async () => {
    const res = await request(app).delete(`/nasabah/${nasabahId}`).set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(204);
  });
});
