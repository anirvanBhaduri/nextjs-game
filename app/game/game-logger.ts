import { createContext } from 'react';

export type WithLogger = {
  logger: Logger;
};

export type WithExternalLogger = {
  externalLogger?: (log: LogMsg) => void;
};

export type LogFunction = (msg: string) => void;
export type LogLevel = 'debug' | 'info' | 'warn' | 'error';
export type LogMsg = {
  id: number;
  msg: string;
  level: LogLevel;
};

export type Logger = {
  [log in LogLevel]: LogFunction;
} & {
  logs: LogMsg[];
};

export class GameLogger implements Logger, WithExternalLogger {
  private id: number = 0;
  public logs: LogMsg[];
  public externalLogger?: (log: LogMsg) => void;

  public constructor(logs: LogMsg[] = [], externalLogger?: (log: LogMsg) => void) {
    this.logs = logs;
    this.externalLogger = externalLogger;
  }

  private formattedLog(msg: string, level: LogLevel) {
    const log: LogMsg = {
      id: this.id,
      msg,
      level,
    };
    this.logs.push(log);
    this.externalLogger?.(log);
    this.id++;
  }

  public debug(msg: string) {
    this.formattedLog(msg, 'debug');
  }

  public info(msg: string) {
    this.formattedLog(msg, 'info');
  }

  public warn(msg: string) {
    this.formattedLog(msg, 'warn');
  }

  public error(msg: string) {
    this.formattedLog(msg, 'error');
  }
}

export const GameLogContext = createContext<{ gameLogs: LogMsg[]; setGameLogs?: (log: LogMsg) => void }>({
  gameLogs: [],
  setGameLogs: undefined,
});
