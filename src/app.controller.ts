import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Instagram')
@Controller('instagram')
export class AppController {
  constructor(private readonly appService: AppService) {
    //...
  }

  @Post('/download')
  @ApiOperation({ summary: 'Download an Instagram post or video' })
  @ApiBody({
    schema: { type: 'object', properties: { url: { type: 'string' } } },
  })
  @ApiResponse({ status: 200, description: 'Download successful' })
  @ApiResponse({ status: 400, description: 'Invalid URL' })
  async post(@Body() body: { url: string }) {
    return this.appService.execute(body.url);
  }
}
