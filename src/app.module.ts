import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DownloadUsecase } from './usecases/instagram';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, DownloadUsecase],
})
export class AppModule {
  //...
}
