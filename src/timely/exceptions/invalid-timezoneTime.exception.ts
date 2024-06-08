import { BadRequestException } from '@nestjs/common';
import { TimelyError } from '../constants/errors.enum';

export class InvalidTimezoneTimeFormatException extends BadRequestException {
    constructor(timezoneTime:string) {
        super([{
            type: TimelyError.E400_INVALID_TIMEZONE_TIME,
            message: `Invalid timezoneTime format: ${timezoneTime}`
        }]);
    }
}
