const request = require('supertest');
const app = require('../app');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();
const SECRET_KEY = process.env.SECRET_KEY;

describe('Transaksi Endpoints', () => {
  let token;
  let nasabahId;
  let bankAkunId;
  let transaksiId;

  beforeAll(async () => {
    // Create a test user and get a valid token
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

    // Create a BankAkun for the nasabah
    const bankAkun = await prisma.bankAkun.create({
      data: { 
        accountNo: '123456', 
        balance: 1000, 
        nasabahId 
      }
    });
    bankAkunId = bankAkun.id;

    // Create a Transaksi for the BankAkun
    const transaksi = await prisma.transaksi.create({
      data: { 
        amount: 200, 
        description: 'Initial deposit', 
        bankAkunId 
      }
    });
    transaksiId = transaksi.id;
  });

  afterAll(async () => {
    // Clean up test data
    await prisma.transaksi.deleteMany();
    await prisma.bankAkun.deleteMany();
    await prisma.nasabah.deleteMany();
    await prisma.$disconnect();
  });

  it('should get all Transaksis by BankAkun ID', async () => {
    const res = await request(app)
      .get(`/transaksi/${bankAkunId}`)
      .set('Authorization', `Bearer ${token}`);
    
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should get a Transaksi by ID', async () => {
    const res = await request(app)
      .get(`/transaksi/${transaksiId}`)
      .set('Authorization', `Bearer ${token}`);
    
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should create a new Transaksi', async () => {
    const res = await request(app)
      .post('/transaksi')
      .set('Authorization', `Bearer ${token}`)
      .send({
        amount: 500,
        description: 'Payment',
        bankAkunId
      });
    
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('amount', 500);
    expect(res.body).toHaveProperty('description', 'Payment');
  });

  it('should update a Transaksi', async () => {
    const res = await request(app)
      .put(`/transaksi/${transaksiId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        amount: 1000,
        description: 'Updated deposit'
      });
    
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('amount', 1000);
    expect(res.body).toHaveProperty('description', 'Updated deposit');
  });

  it('should delete a Transaksi', async () => {
    const res = await request(app)
      .delete(`/transaksi/${transaksiId}`)
      .set('Authorization', `Bearer ${token}`);
    
    expect(res.statusCode).toEqual(204);
  });
});
