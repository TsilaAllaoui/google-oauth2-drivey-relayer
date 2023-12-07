import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
@Controller()
@ApiTags('🔑 Access Token Generation')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('generate')
  async sendAccessTokenToDrivey(@Query('code') code: string) {
    return this.appService.sendAccessTokenToDrivey(code);
  }
}
