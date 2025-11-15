import { Injectable } from '@nestjs/common';
import { DownloadUsecase } from './usecases/instagram';

@Injectable()
export class AppService {
  constructor(private readonly downloadUsecase: DownloadUsecase) {
    //...
  }

  execute(url: string): Promise<string> {
    return this.downloadUsecase.execute(url);
  }
}
