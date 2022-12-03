import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('update/:workshop')
  getWorkshop(@Param('workshop') workshop: string): Promise<string> {
    return this.appService.getWorkshop(workshop);
  }

  @Get('gcp-update/:workshop')
  getGcpWorkshop(@Param('workshop') workshop: string): Promise<string> {
    return this.appService.getGcpWorkshop(workshop);
  }

  @Get('gcp')
  getGcp(): string {
    return this.appService.getGcp();
  }
}
