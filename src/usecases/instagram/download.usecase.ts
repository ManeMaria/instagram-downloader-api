import { Injectable } from '@nestjs/common';
import { chromium } from 'playwright';

@Injectable()
export class DownloadUsecase {
  async execute(url: string): Promise<string> {
    try {
      const browser = await chromium.launch();
      const page = await browser.newPage();

      await page.goto(url);

      await page.mouse.click(150, 300);
      const video = await page.$eval('video', (el) => el.src);

      await browser.close();
      console.log(video);

      return video;
    } catch (error) {
      console.error('🚀 ~ DownloadUsecase ~ execute ~ error:', error);
      throw error;
    }
  }
}
