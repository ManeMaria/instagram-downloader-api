import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';

const validUrl =
  'https://www.instagram.com/reel/DRJ224UjmO3/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==';
describe('DownloaderController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('valid url', () => {
    it('should return 200', async () => {
      const response = await request(app.getHttpServer())
        .post('/instagram/download')
        .send({
          url: validUrl,
        });

      expect(response.status).toBe(200);
    });
  });

  describe('invalid url', () => {
    it('should return 400', async () => {
      const response = await request(app.getHttpServer())
        .post('/instagram/download')
        .send({
          url: 'invalid-url',
        });

      expect(response.status).toBe(400);
    });
  });
});
