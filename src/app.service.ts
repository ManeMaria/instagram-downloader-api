import { Injectable } from '@nestjs/common';
import { DownloadUsecase } from './usecases/instagram';

@Injectable()
export class AppService {
  constructor(private downloadUsecase: DownloadUsecase) {
    //...
  }

  execute(url: string): Promise<string> {
    console.log('🚀 ~ AppService ~ execute ~ url:', url);
    return this.downloadUsecase.execute(url);
  }
}
