import { Injectable } from '@nestjs/common';
import { Timezone } from 'src/timely/constants/timezones.enum';
import { InvalidOffsetFormatException } from 'src/timely/exceptions/invalid-offset.exception';
import { InvalidUtcFormatException } from 'src/timely/exceptions/invalid-utc.exception';
import { InvalidTimezoneTimeFormatException } from '../exceptions/invalid-timezoneTime.exception';

@Injectable()
export class TimelyService {
  //** convert UTC to standard time */
  convertUtcToTimezone(utcTimeStr: string, offset: Timezone | string): string {
    this.validateUtcFormat(utcTimeStr);
    const { sign, hours, minutes } = this.validateOffsetFormat(offset);

    const utcTime = new Date(utcTimeStr);
    const offsetMs =
      (hours * 60 + minutes) * 60 * 1000 * (sign === '-' ? -1 : 1);
    const targetTime = new Date(utcTime.getTime() + offsetMs);
    const formattedTime = `${targetTime.toISOString().slice(0, 19).replace('T', ' ')}`;

    return formattedTime;
  }

  //** convert standard to UTC time */
  convertToUtc(timezoneTime: string, offsetString: Timezone | string) {
    this.validateTimezoneFormat(timezoneTime);
    this.validateOffsetFormat(offsetString);
    const [datePart, timePart] = timezoneTime.split('_');
    const [year, month, day] = datePart.split('-').map(Number);
    const [hours, minutes, seconds] = timePart.split(':').map(Number);

    const localDate = new Date(
      Date.UTC(year, month - 1, day, hours, minutes, seconds),
    );

    const sign = offsetString[0] === '-' ? -1 : 1;
    const offsetWithoutSign = offsetString.replace('-', '').replace('+', '');
    const [offsetHours, offsetMinutes] = offsetWithoutSign
      .split(':')
      .map(Number);
    const offsetInMilliseconds =
      (offsetHours * 60 + offsetMinutes) * 60 * 1000 * sign;

    const utcTime = new Date(localDate.getTime() - offsetInMilliseconds);
    return utcTime.toISOString().split('.')[0] + 'Z';
  }

  //** validate UTC */
  private validateUtcFormat(utcTimeStr: string): void {
    const utcRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/;
    if (!utcTimeStr.match(utcRegex)) {
      throw new InvalidUtcFormatException(utcTimeStr);
    }
  }

  //** validate offset */
  private validateOffsetFormat(offset: string): {
    sign: string;
    hours: number;
    minutes: number;
  } {
    const offsetRegex = /^([-+]?)(\d{1,2}):?(\d{2})?$/;
    const match = offset.match(offsetRegex);

    if (!match) {
      throw new InvalidOffsetFormatException(offset);
    }

    const [_, sign, hoursStr, minutesStr] = match;
    const hours = parseInt(hoursStr, 10);
    const minutes = minutesStr ? parseInt(minutesStr, 10) : 0;

    return { sign, hours, minutes };
  }

  //** validate timezone time */
  private validateTimezoneFormat(timezoneTimeStr: string): void {
    const timezoneRegex = /^\d{4}-\d{2}-\d{2}_\d{2}:\d{2}:\d{2}$/;
    if (!timezoneTimeStr.match(timezoneRegex)) {
      throw new InvalidTimezoneTimeFormatException(timezoneTimeStr);
    }
  }
}
