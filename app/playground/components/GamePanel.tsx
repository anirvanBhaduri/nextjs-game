'use client';

import React, { useRef } from 'react';
import use2dRenderingEngine from '../hooks/canvas';
import { RenderInitMethod, RenderLifeCycleMethod } from '../hooks/canvas';
import { GameEngine } from '../game/game-engine';
import { PhysicsEngine } from '../game/physics-engine';
import { Rectangle } from '../game/objects/rectangle';
import { Vector2d } from '../game/objects/types';
import { GameLogger, Logger, useGameContext } from '../game/game-logger';

export interface GamePanelProps {}

type GameArtifacts = {
  gameInit: RenderInitMethod;
  gameBeforeRender: RenderLifeCycleMethod;
  gameOnDestroy: () => void;
  gameEngine: GameEngine;
};

const setupGame = (logger: Logger): GameArtifacts => {
  const gameEngine = new GameEngine(logger);

  const gameInit: RenderInitMethod = (canvas) => {
    if (!gameEngine.physicsEngine) {
      gameEngine.physicsEngine = new PhysicsEngine(new Rectangle(canvas.width, canvas.height), logger);

      // now setup the game objects
      gameEngine.addBall();
      gameEngine.addPlayer('w', 's', new Vector2d(30, canvas.height / 2), 'Player 1');
      gameEngine.addPlayer('i', 'k', new Vector2d(canvas.width - 30, canvas.height / 2), 'Player 2');

      // finally start the game
      gameEngine.start();
    }
  };

  const gameBeforeRender: RenderLifeCycleMethod = (_, __, previousRenderTime, currentRenderTime) => {
    if (previousRenderTime && currentRenderTime) {
      gameEngine.runPhysics(currentRenderTime - previousRenderTime);
    }
  };

  const gameOnDestroy = () => {
    gameEngine.destroy();
  };

  // we will also create a game after render too, where we can perform some game
  // related logic, like cleaning up some objects, WIN/LOSS etc.

  return {
    gameInit,
    gameBeforeRender,
    gameOnDestroy,
    gameEngine,
  };
};

/**
 * Game doesn't yet support game screen resizing. One will need to refresh
 * the page after resizing the screen.
 *
 * @returns
 */
const GamePanel: React.FunctionComponent<GamePanelProps> = () => {
  const { setGameLogs } = useGameContext();
  const gameArtifacts = useRef<GameArtifacts | null>(null);

  if (!gameArtifacts.current) {
    gameArtifacts.current = setupGame(new GameLogger([], setGameLogs));
  }

  const canvasRef = use2dRenderingEngine(gameArtifacts.current.gameEngine.getRenderCommand(), {
    init: gameArtifacts.current.gameInit,
    beforeRender: gameArtifacts.current.gameBeforeRender,
    onDestroy: gameArtifacts.current.gameOnDestroy,
  });

  return (
    <div className="h-fit relative w-full rounded-lg bg-gray-700 flex flex-col gap-2 p-4">
      <h2 className="text-sm">GamePanel</h2>
      <canvas className="h-[350px] w-full bg-black rounded-md" ref={canvasRef} />
      <div className="z-1 absolute top-20 left-0 right-0 mx-auto w-24">
        {gameArtifacts.current.gameEngine.isPaused() && <div className="text-center font-bold">Paused</div>}
      </div>
    </div>
  );
};

export default GamePanel;
