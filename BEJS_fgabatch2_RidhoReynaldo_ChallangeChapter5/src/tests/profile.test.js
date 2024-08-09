const request = require('supertest');
const app = require('../app'); // Adjust the path to your app file
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();
const SECRET_KEY = process.env.SECRET_KEY;

describe('Profile Endpoints', () => {
  let token;
  let nasabahId;
  let profileId;

  beforeAll(async () => {
    // Create a test user and get a valid token
    const hashedPassword = await bcrypt.hash('password', 10);
    const user = await prisma.nasabah.create({
      data: {
        email: 'test@example.com',
        password: hashedPassword,
      },
    });
    token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });

    nasabahId = user.id;

    // Create a profile for testing
    const profile = await prisma.profile.create({
      data: {
        name: 'John Doe',
        nasabahId,
      },
    });
    profileId = profile.id;
  });

  afterAll(async () => {
    // Clean up test data
    await prisma.profile.deleteMany();
    await prisma.nasabah.deleteMany();
    await prisma.$disconnect();
  });

  it('should get all profiles for a nasabah', async () => {
    const res = await request(app)
      .get(`/profile/${nasabahId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('name', 'John Doe');
    expect(res.body).toHaveProperty('nasabahId', nasabahId);
  });

  it('should create a new profile', async () => {
    const res = await request(app)
      .post('/profile')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'John Doe',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('name', 'John Doe');
  });

  it('should update an existing profile', async () => {
    const res = await request(app)
      .put(`/profile/${nasabahId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'John Doe',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('name', 'John Doe');
  });

  it('should delete a profile', async () => {
    const res = await request(app)
      .delete(`/profile/${profileId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(204);
  });
});
