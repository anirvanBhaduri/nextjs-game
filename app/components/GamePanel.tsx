'use client';

import React from 'react';
import use2dRenderingEngine from '../hooks/canvas';
import { RenderInitMethod, RenderLifeCycleMethod } from '../hooks/canvas';
import { GameEngine } from '../game/game-engine';
import { PhysicsEngine } from '../game/physics-engine';
import { Rectangle } from '../game/objects/rectangle';

export interface GamePanelProps {}

type GameArtifacts = {
  gameInit: RenderInitMethod;
  gameBeforeRender: RenderLifeCycleMethod;
  gameEngine: GameEngine;
};

const setupGame = (): GameArtifacts => {
  const gameEngine = new GameEngine();

  const gameInit: RenderInitMethod = (canvas) => {
    if (!gameEngine.physicsEngine) {
      gameEngine.physicsEngine = new PhysicsEngine(new Rectangle(canvas.width, canvas.height));

      // now setup the game objects
      gameEngine.addBall();

      // finally start the game
      gameEngine.start();
    }
  };

  const gameBeforeRender: RenderLifeCycleMethod = (_, __, previousRenderTime, currentRenderTime) => {
    if (previousRenderTime && currentRenderTime) {
      gameEngine.runPhysics(currentRenderTime - previousRenderTime);
    }
  };

  // we will also create a game after render too, where we can perform some game
  // related logic, like cleaning up some objects, WIN/LOSS etc.

  return {
    gameInit,
    gameBeforeRender,
    gameEngine,
  };
};

let gameArtifacts: GameArtifacts;

const GamePanel: React.FunctionComponent<GamePanelProps> = () => {
  if (!gameArtifacts) {
    gameArtifacts = setupGame();
  }

  const canvasRef = use2dRenderingEngine(gameArtifacts.gameEngine.getRenderCommands(), {
    init: gameArtifacts.gameInit,
    beforeRender: gameArtifacts.gameBeforeRender,
  });

  return (
    <div className="h-fit w-full rounded-lg bg-gray-700 flex flex-col gap-2 p-4">
      <h2>GamePanel</h2>
      <canvas className="h-[350px] w-full" ref={canvasRef} />
    </div>
  );
};

export default GamePanel;
