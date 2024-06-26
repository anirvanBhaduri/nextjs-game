'use client';

import { useState } from 'react';
import GamePanel from './components/GamePanel';
import LogPanel from './components/LogPanel';
import { GameLogContext, LogMsg } from './game/game-logger';
import HelpText from './components/HelpText';

const PlayGround: React.FunctionComponent = () => {
  // NOTE: using logger with a LoggerContext for fun
  // to try out contexts. Otherwise, we could have simply
  // passed the logger through as a prop!
  const [gameLogs, setGameLogs] = useState<LogMsg[]>([]);

  return (
    <main className="flex grow flex-col gap-5 py-4 px-4 md:px-10 lg:px-24">
      <h1 className="text-2xl font-bold text-center my-5">Ping pong game</h1>
      <div className="flex flex-col lg:flex-row gap-5">
        <GameLogContext.Provider value={{ gameLogs, setGameLogs: (log) => setGameLogs((logs) => [...logs, log]) }}>
          <div className="w-full lg:w-2/3 flex-auto text-center">
            <GamePanel />
          </div>
          <div className="w-full lg:w-1/3 flex-auto text-center">
            <LogPanel />
          </div>
        </GameLogContext.Provider>
      </div>
      <HelpText />
    </main>
  );
};

export default PlayGround;
