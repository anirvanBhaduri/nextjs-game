import { Ball } from './objects/ball';
import { Paddle } from './objects/paddle';
import { RenderCommand, Vector2d, WithDraw2d, With2dDimensions, WithPos } from './objects/types';
import { PhysicsEngine } from './physics-engine';

export enum GameState {
  INIT = 1,
  PLAY,
  PAUSED,
  END,
}

export type GameObject = WithPos & With2dDimensions & WithDraw2d;

export class NoPhysicsEngine extends Error {}

export class GameEngine {
  private gameState: GameState;
  private _physicsEngine: PhysicsEngine | undefined = undefined;
  private gameObjects: GameObject[];
  private balls: Ball[];
  private players: Paddle[] = [];
  private renderCommand: RenderCommand = {
    drawables: [],
  };

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
      gameBoundary.pos.x + Math.floor(gameBoundary.width / 2),
      gameBoundary.pos.y + Math.floor(gameBoundary.height / 3) + Math.floor((Math.random() * gameBoundary.height) / 3)
    );

    const ballXDirection = Math.random() > 0.5 ? 1 : -1;
    const ballYDirection = Math.random() > 0.5 ? 1 : -1;
    const newBall = new Ball(
      20,
      randomStartingPos,
      new Vector2d(
        Math.floor((1000 + Math.random() * 200) * ballXDirection),
        Math.floor((100 + Math.random() * 200) * ballYDirection)
      )
    );
    this.balls.push(newBall);
    this.gameObjects.push(newBall);
    this.renderCommand.drawables.push(newBall);
  }

  /**
   * TODO: future improvement - give the up/down input values a type
   * that also allows inputs other than keyboard keys, e.g. mouse movement above or
   * below the centre of the player.
   *
   * @param upKey
   * @param downKey
   */
  public addPlayer(upKey: string, downKey: string, startPos: Vector2d) {
    if (!this._physicsEngine) {
      throw new NoPhysicsEngine();
    }

    // long but thin paddle
    const paddleHeight = 150;
    startPos.y -= Math.floor(paddleHeight / 2);
    const newPlayer = new Paddle(20, paddleHeight, startPos, new Vector2d(0, 30));
    this.players.push(newPlayer);
    this.gameObjects.push(newPlayer);
    this.renderCommand.drawables.push(newPlayer);

    newPlayer.setUpKey(upKey);
    newPlayer.setDownKey(downKey);
    document.addEventListener('keydown', newPlayer.upKeyListener.bind(newPlayer));
    document.addEventListener('keydown', newPlayer.downKeyListener.bind(newPlayer));
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

    for (let player of this.players) {
      this._physicsEngine.calculateNextPlayerPosition(player);
    }

    for (let ball of this.balls) {
      this._physicsEngine.calculateNextBallPosition(ball, timeDelta / 1000, this.players);
    }
  }

  public getRenderCommand(): RenderCommand {
    return this.renderCommand;
  }

  public destroy() {
    // destroy event listeners here
    this.players.forEach((player) => {
      document.removeEventListener('keydown', player.upKeyListener);
      document.removeEventListener('keydown', player.downKeyListener);
    });
  }
}
