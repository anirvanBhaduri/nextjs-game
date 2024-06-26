import React, { useEffect, useRef } from 'react';
import { LogLevel, useGameContext } from '../game/game-logger';

const logLevelToColour: {
  [log in LogLevel]: string;
} = {
  debug: 'text-white',
  info: 'text-sky-400',
  warn: 'text-yellow-500',
  error: 'text-red-800',
};

/**
 * This component will use the game's context to
 * fetch the logs of what is happening within the
 * game and will display it in a panel, auto-scrolling
 * as it receives more messages.
 *
 */
const LogPanel: React.FunctionComponent = () => {
  const { gameLogs } = useGameContext();
  const logsRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (logsRef?.current) {
      logsRef.current.scrollTop = logsRef.current.scrollHeight;
    }
  }, [gameLogs]);

  return (
    <div className="h-fit w-full rounded-lg bg-blue-800 flex flex-col gap-2 p-4">
      <h2 className="text-sm">LogPanel</h2>
      <ul ref={logsRef} className="h-[350px] bg-black overflow-auto w-full rounded-md scroll-smooth">
        {gameLogs.map((logLine) => {
          return (
            <li key={logLine.id} className={`w-full px-1 flex align-left text-sm ${logLevelToColour[logLine.level]}`}>
              [{logLine.level}] {logLine.msg}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default LogPanel;
