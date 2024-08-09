const request = require('supertest');
const app = require('../app');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();
const SECRET_KEY = process.env.SECRET_KEY;

describe('BankAkun Endpoints', () => {
  let token;
  let nasabahId;
  let bankAkunId;

  beforeAll(async () => {
    // Create a test user and get a valid token
    const hashedPassword = await bcrypt.hash('testpassword', 10);
    const user = await prisma.nasabah.create({
      data: {
        email: 'test@example.com',
        password: hashedPassword,
      },
    });
    token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });

    nasabahId = user.id;

    // Create a BankAkun for testing
    const bankAkun = await prisma.bankAkun.create({
      data: {
        accountNo: '123456',
        balance: 1000,
        nasabahId,
      },
    });
    bankAkunId = bankAkun.id;
  });

  afterAll(async () => {
    // Clean up test data
    await prisma.bankAkun.deleteMany();
    await prisma.nasabah.deleteMany();
    await prisma.$disconnect();
  });

  it('should get all BankAkuns by Nasabah ID', async () => {
    const res = await request(app)
      .get(`/bankAkun/${nasabahId}`)
      .set('Authorization', `Bearer ${token}`);
    
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should get a BankAkun by ID', async () => {
    const res = await request(app)
      .get(`/bankAkun/akun/${bankAkunId}`)
      .set('Authorization', `Bearer ${token}`);
    
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id', bankAkunId);
  });

  it('should create a new BankAkun', async () => {
    const res = await request(app)
      .post('/bankAkun')
      .set('Authorization', `Bearer ${token}`)
      .send({
        accountNo: '654321',
        balance: 2000,
        nasabahId // Ensure to include nasabahId if required
      });
    
    expect(res.statusCode).toEqual(201);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should update a BankAkun', async () => {
    const res = await request(app)
      .put(`/bankAkun/${bankAkunId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        balance: 5000
      });
    
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('balance', 5000);
  });

  it('should delete a BankAkun', async () => {
    const res = await request(app)
      .delete(`/bankAkun/${bankAkunId}`)
      .set('Authorization', `Bearer ${token}`);
    
    expect(res.statusCode).toEqual(204);
  });
});
