import { INestApplication } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';

type GenerateSwaggerConfigInput = {
  apiPort: number;
  environment: string;
  jsonDocumentUrl: string;
  host?: string;
};

export const generateSwaggerConfig = (input: GenerateSwaggerConfigInput) => {
  const {
    apiPort,
    environment,
    jsonDocumentUrl,
    host = 'http://localhost',
  } = input;

  const API_NAME = 'INSTAGRAM DOWNLOADER API';
  const API_DESCRIPTION =
    'Instagram Downloader API is a API that allows you to download Instagram posts and videos.';
  const API_VERSION = '0.0.1';
  const API_LICENSE = 'MIT';
  const API_LICENSE_URL =
    'https://github.com/ManeMaria/instagram-downloader-api/blob/main/LICENSE';

  const serverUrl = `${host}:${apiPort}`;

  const documentation = new DocumentBuilder()
    .setTitle(API_NAME)
    .setDescription(API_DESCRIPTION)
    .setVersion(API_VERSION)
    .setLicense(API_LICENSE, API_LICENSE_URL)
    .addServer(serverUrl, environment, {
      [environment]: {
        default: true,
      },
    })
    .addBearerAuth()
    .setExternalDoc(API_NAME, `${serverUrl}${jsonDocumentUrl}`)
    .build();

  return documentation;
};

export function openApi(app: INestApplication) {
  const JSON_DOCUMENT_URL = '/docs/openapi';
  const DOCUMENTATION_PATH = 'docs';

  const config = generateSwaggerConfig({
    apiPort: Number(process.env.API_PORT ?? 3000),
    environment: `${process.env.NODE_ENV ?? 'development'}`,
    jsonDocumentUrl: JSON_DOCUMENT_URL,
  });

  const document = SwaggerModule.createDocument(app, config);

  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
    jsonDocumentUrl: JSON_DOCUMENT_URL,
  };

  SwaggerModule.setup(DOCUMENTATION_PATH, app, document, customOptions);
}
