import { Controller, Get, Query } from '@nestjs/common';
import { TimelyService } from '../services/timely.service';

@Controller('timely')
export class TimelyController {
    constructor(private readonly timelyService: TimelyService){}
}
