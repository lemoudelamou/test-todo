const request = require('supertest');
const express = require('express');
const router = require('../routes/root');

const app = express();
app.use('/', router);

describe('Root Route', () => {
  it('should return index.html content for root route', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toContain('<h1>Todo-app API</h1>');
  });

  it('should return index.html content for /index.html route', async () => {
    const response = await request(app).get('/index.html');
    expect(response.status).toBe(200);
    expect(response.text).toContain('<h1>Todo-app API</h1>');
  });

  // Add more test cases as needed
});
