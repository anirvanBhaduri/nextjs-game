'use client';

import { useState } from 'react';
import GamePanel from './components/GamePanel';
import LogPanel from './components/LogPanel';
import { GameLogContext, LogMsg } from './game/game-logger';

export default function Home() {
  // NOTE: using logger with a LoggerContext for fun
  // to try out contexts. Otherwise, we could have simply
  // passed the logger through as a prop!
  const [gameLogs, setGameLogs] = useState<LogMsg[]>([]);

  return (
    <main className="flex flex-col lg:flex-row lg:flex-1 gap-5">
      <GameLogContext.Provider value={{ gameLogs, setGameLogs: (log) => setGameLogs((logs) => [...logs, log]) }}>
        <div className="w-full lg:w-2/3 flex-auto text-center">
          <GamePanel />
        </div>
        <div className="w-full lg:w-1/3 flex-auto text-center">
          <LogPanel />
        </div>
      </GameLogContext.Provider>
    </main>
  );
}
