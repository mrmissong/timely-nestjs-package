import { Module } from '@nestjs/common';
import { TimelyService } from './services/timely.service';
import { TimelyController } from './controllers/timely.controller';

@Module({
  providers: [TimelyService],
  controllers: [TimelyController]
})
export class TimelyModule {}
