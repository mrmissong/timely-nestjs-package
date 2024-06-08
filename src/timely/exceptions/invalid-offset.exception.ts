import { BadRequestException } from '@nestjs/common';
import { TimelyError } from '../constants/errors.enum';

export class InvalidOffsetFormatException extends BadRequestException {
    constructor(offset:string) {
        super([{
            type: TimelyError.E400_INVALID_OFFSET,
            message: `Invalid offset format: ${offset}`
        }]);
    }
}
