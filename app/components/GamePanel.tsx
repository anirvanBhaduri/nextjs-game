'use client';

import React from 'react';
import use2dRenderingEngine from '../hooks/canvas';
import { RenderInitMethod, RenderLifeCycleMethod } from '../hooks/canvas';
import { GameEngine } from '../game/game-engine';
import { PhysicsEngine } from '../game/physics-engine';
import { Rectangle } from '../game/objects/rectangle';
import { Vector2d } from '../game/objects/types';

export interface GamePanelProps {}

type GameArtifacts = {
  gameInit: RenderInitMethod;
  gameBeforeRender: RenderLifeCycleMethod;
  gameOnDestroy: () => void;
  gameEngine: GameEngine;
};

const setupGame = (): GameArtifacts => {
  const gameEngine = new GameEngine();

  const gameInit: RenderInitMethod = (canvas) => {
    if (!gameEngine.physicsEngine) {
      gameEngine.physicsEngine = new PhysicsEngine(new Rectangle(canvas.width, canvas.height));

      // now setup the game objects
      gameEngine.addBall();
      gameEngine.addPlayer('w', 's', new Vector2d(20, canvas.height / 2));

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

const GamePanel: React.FunctionComponent<GamePanelProps> = () => {
  const gameArtifacts = setupGame();

  const canvasRef = use2dRenderingEngine(gameArtifacts.gameEngine.getRenderCommand(), {
    init: gameArtifacts.gameInit,
    beforeRender: gameArtifacts.gameBeforeRender,
  });

  return (
    <div className="h-fit w-full rounded-lg bg-gray-700 flex flex-col gap-2 p-4">
      <h2>GamePanel</h2>
      <canvas className="h-[350px] w-full bg-black" ref={canvasRef} />
    </div>
  );
};

export default GamePanel;
