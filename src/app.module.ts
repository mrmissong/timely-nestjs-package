import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TimelyModule } from './timely/timely.module';

@Module({
  imports: [TimelyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
