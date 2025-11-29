import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { DownloadUsecase } from 'src/usecases/instagram/download.usecase';

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
      const expectedResponse = { url: 'test' };
      jest.spyOn(DownloadUsecase.prototype, 'execute').mockResolvedValueOnce(Promise.resolve(expectedResponse.url));

      const response = await request(app.getHttpServer())
        .post('/instagram/download')
        .send({
          url: validUrl,
        });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(expectedResponse);

    });
  });

  describe('invalid url', () => {
    it('should return 400', async () => {
      try {
        await request(app.getHttpServer())
          .post('/instagram/download')
          .send({
            url: 'invalid-url',
          });

      } catch (error) {
        expect(error.body.message).toBe('url não é uma url do instagram');
        expect(error.status).toBe(400);
        expect(error.body.error).toBe('Bad Request');
      }
    });
  });

  describe('falsy value property', () => {
    it('should return 400', async () => {
      try {
        await request(app.getHttpServer())
          .post('/instagram/download')
          .send({
            url: undefined,
          });
      } catch (error) {
        expect(error.status).toBe(400);
        expect(error.body.message).toBe('somente texto');
        expect(error.body.error).toBe('Bad Request');
      }
    });
  });

  describe('null value property', () => {
    it('should return 400', async () => {
      try {
        await request(app.getHttpServer())
          .post('/instagram/download')
          .send({
            url: '',
          });
      } catch (error) {
        expect(error.status).toBe(400);
        expect(error.body.message).toBe('não é permitido propriedade vazia');
        expect(error.body.error).toBe('Bad Request');
      }
    });
  });
});