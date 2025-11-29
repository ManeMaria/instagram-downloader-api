import { IsString, IsNotEmpty, registerDecorator, ValidationOptions } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export function isInstagramUrl(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) =>
    registerDecorator({
      name: 'isInstagramUrl',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any): boolean | Promise<boolean> {
          const regex = /https?:\/\/(www\.)?instagram\.com\/.*/;
          return regex.test(value);
        },
      },
    });
}

export class DownloadDto {
  @ApiProperty({
    description: 'URL do post ou vídeo do Instagram',
    example: 'https://www.instagram.com/p/ABC123/',
    type: String,
  })
  @IsString({
    message: 'somente texto',
  })
  @IsNotEmpty({
    message: 'não é permitido propriedade vazia',
  })
  @isInstagramUrl({
    message: 'url não é uma url do instagram',
  })
  url: string;
}