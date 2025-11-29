import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DownloadDto } from './dto';

@ApiTags('Instagram')
@Controller('instagram')
export class AppController {
  constructor(readonly appService: AppService) {
    //...
  }

  @Post('/download')
  @ApiOperation({ summary: 'Download an Instagram post or video' })
  @ApiResponse({
    status: 200,
    description: 'Download successful',
    schema: {
      type: 'object',
      properties: {
        url: { type: 'string' },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Invalid URL' })
  @HttpCode(HttpStatus.OK)
  async post(@Body() body: DownloadDto) {
    const response = await this.appService.execute(body.url);
    return {
      url: response,
    };
  }
}
