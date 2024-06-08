import { BadRequestException } from '@nestjs/common';
import { TimelyError } from '../constants/errors.enum';

export class InvalidUtcFormatException extends BadRequestException {
    constructor(utc:string) {
        super([{
            type: TimelyError.E400_INVALID_UTC,
            message: `Invalid utc format: ${utc}`
        }]);
    }
}

