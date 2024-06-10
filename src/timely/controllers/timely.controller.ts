import { Controller, Get, Query } from '@nestjs/common';
import { TimelyService } from '../services/timely.service';

@Controller('timely')
export class TimelyController {
  constructor(private readonly timelyService: TimelyService) {}
  @Get('utc-to-timezone')
  convertUtcToTimezone(
    @Query('utcTime') utcTime: string,
    @Query('offset') offset: string,
  ): string {
    return this.timelyService.convertUtcToTimezone(utcTime, offset);
  }

  @Get('timezone-to-utc')
  convertTimezoneToUtc(
    @Query('timezoneTime') timezoneTime: string,
    @Query('offset') offset: string,
  ): string {
    return this.timelyService.convertToUtc(timezoneTime, offset);
  }
}
