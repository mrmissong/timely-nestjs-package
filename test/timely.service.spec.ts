import { TimelyService } from '../src/timely/services/timely.service';

describe('TimelyService', () => {
  let timelyService: TimelyService;

  beforeEach(() => {
    timelyService = new TimelyService();
  });

  describe('convertUtcToTimezone', () => {
    it('should convert UTC time to timezone time with positive offset', () => {
      const utcTime = '2024-06-08T20:00:00.000Z';
      const offset = '+05:30';
      const timezoneTime = timelyService.convertUtcToTimezone(utcTime, offset);
      expect(timezoneTime).toBe('2024-06-09 01:30:00');
    });

    it('should convert UTC time to timezone time with negative offset', () => {
      const utcTime = '2024-06-08T20:00:00.000Z';
      const offset = '-05:00';
      const timezoneTime = timelyService.convertUtcToTimezone(utcTime, offset);
      expect(timezoneTime).toBe('2024-06-08 15:00:00');
    });

    it('should throw error for invalid UTC format', () => {
      const utcTime = 'invalid-utc-format';
      const offset = '+05:30';
      expect(() => timelyService.convertUtcToTimezone(utcTime, offset)).toThrow();
    });

    it('should throw error for invalid offset format', () => {
      const utcTime = '2024-06-08T20:00:00.000Z';
      const offset = 'invalid-offset-format';
      expect(() => timelyService.convertUtcToTimezone(utcTime, offset)).toThrow();
    });

    // Add more test cases as needed
  });

  describe('convertToUTC', () => {
    it('should convert timezone time to UTC with positive offset', () => {
      const timezoneTime = '2024-06-09_01:30:00';
      const offset = '+05:30';
      const utcTime = timelyService.convertToUTC(timezoneTime, offset);
      expect(utcTime).toBe('2024-06-08T20:00:00.000Z');
    });

    it('should convert timezone time to UTC with negative offset', () => {
      const timezoneTime = '2024-06-08_15:00:00';
      const offset = '-05:00';
      const utcTime = timelyService.convertToUTC(timezoneTime, offset);
      expect(utcTime).toBe('2024-06-08T20:00:00.000Z');
    });

    it('should throw error for invalid timezone time format', () => {
      const timezoneTime = 'invalid-timezone-time-format';
      const offset = '+05:30';
      expect(() => timelyService.convertToUTC(timezoneTime, offset)).toThrow();
    });

    it('should throw error for invalid offset format', () => {
      const timezoneTime = '2024-06-08_20:00:00';
      const offset = 'invalid-offset-format';
      expect(() => timelyService.convertToUTC(timezoneTime, offset)).toThrow();
    });

    // Add more test cases as needed
  });

  // Add more test cases for other methods
});
