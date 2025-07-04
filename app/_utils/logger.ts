type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export class Logger {
  constructor() {}

  log(message: string, level: LogLevel = 'info') {
    if (level === 'debug') {
      console.debug(message);
    } else if (level === 'warn') {
      console.warn(message);
    } else if (level === 'error') {
      console.error(message);
    } else {
      console.log(message);
    }
  }
}
