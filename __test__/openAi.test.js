const request = require('supertest');
const { app } = require('../app'); // Sesuaikan dengan path menuju berkas aplikasi Anda

describe('POST: /Ask_Problem', () => {

  afterAll(async () => {
    // Menutup server Express setelah semua pengujian selesai
    await app.close();
  });

  test.only('should respond with completions when valid request is made to /Ask_Problem', async () => {
    const body = { questionType: 'rekomendasi', message: 'Saya ingin menanam tanaman hias di dalam ruangan, apa yang Anda rekomendasika?' }
    const response = await request(app)
    .post('/Ask_Problem')
    .send(body);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);

  }, 10000);

  test('should respond with 400 error when invalid question type is provided', async () => {
    const body = { questionType: 'invalidType', message: 'sample message' }
    const response = await request(app)
      .post('/Ask_Problem')
      .send(body);

    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Tipe pertanyaan tidak valid');
  });

});
