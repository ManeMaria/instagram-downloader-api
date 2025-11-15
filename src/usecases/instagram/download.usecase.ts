import { Injectable } from '@nestjs/common';
import { chromium } from 'playwright';

@Injectable()
export class DownloadUsecase {
  async execute(url: string): Promise<string> {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    await page.goto(url);

    const video = await page.$eval('video', (el) => el.src);
    console.log(video);

    await browser.close();

    return video;
  }
}
