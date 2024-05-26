import { Ball } from './objects/ball';
import { RenderCommand, Vector2d, WithDraw2d, With2dDimensions, WithPos } from './objects/types';
import { PhysicsEngine } from './physics-engine';

export enum GameState {
  INIT = 1,
  PLAY,
  PAUSED,
  END,
}

enum ObjectColourPos {
  WHITE = 0,
}

export type GameObject = WithPos & With2dDimensions & WithDraw2d;

export class NoPhysicsEngine extends Error {}

export class GameEngine {
  private gameState: GameState;
  private _physicsEngine: PhysicsEngine | undefined = undefined;
  private gameObjects: GameObject[];
  private balls: Ball[];
  private renderCommands: RenderCommand[] = [
    {
      fillStyle: '#ffffff',
      drawables: [],
    },
  ];

  public constructor() {
    this.gameState = GameState.INIT;
    this.balls = [];
    this.gameObjects = [];
  }

  set physicsEngine(physicsEngine: PhysicsEngine) {
    this._physicsEngine = physicsEngine;
  }

  get physicsEngine(): PhysicsEngine | undefined {
    return this._physicsEngine;
  }

  public start() {
    this.gameState = GameState.PLAY;
  }

  public pause() {
    this.gameState = GameState.PAUSED;
  }

  public resume() {
    if (this.gameState === GameState.PAUSED) {
      this.gameState = GameState.PLAY;
    }
  }

  public stop() {
    this.gameState = GameState.END;
  }

  public addBall() {
    if (!this._physicsEngine) {
      throw new NoPhysicsEngine();
    }

    const gameBoundary = this._physicsEngine.getGameBoundary();

    // start the ball from the middle of the boundary on x axis
    // and from somewhere between 1/3 of the boundary down till 2/3 of the boundary
    const randomStartingPos = new Vector2d(
      gameBoundary.pos.x + gameBoundary.width / 2,
      gameBoundary.pos.y + gameBoundary.height / 3 + Math.floor((Math.random() * gameBoundary.height) / 3)
    );

    const ballXDirection = Math.random() > 0.5 ? 1 : -1;
    const ballYDirection = Math.random() > 0.5 ? 1 : -1;
    const newBall = new Ball(
      20,
      randomStartingPos,
      new Vector2d((1000 + Math.random() * 200) * ballXDirection, (100 + Math.random() * 200) * ballYDirection)
    );
    this.balls.push(newBall);
    this.gameObjects.push(newBall);
    this.renderCommands[ObjectColourPos.WHITE].drawables.push(newBall);
  }

  /**
   * @param timeDelta in ms
   */
  public runPhysics(timeDelta: number) {
    if (!this._physicsEngine) {
      throw new NoPhysicsEngine();
    }

    if (this.gameState !== GameState.PLAY) {
      return;
    }

    for (let ball of this.balls) {
      this._physicsEngine.calculateNextBallPosition(ball, timeDelta / 1000, []);
    }
  }

  public getRenderCommands(): RenderCommand[] {
    return this.renderCommands;
  }
}
