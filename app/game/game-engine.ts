import { GameLogger, Logger, WithLogger } from './game-logger';
import { Ball } from './objects/ball';
import { Player } from './objects/player';
import { RenderCommand, Vector2d, WithDraw2d, With2dDimensions, WithPos } from './objects/types';
import { PhysicsEngine } from './physics-engine';

export enum GameState {
  INIT = 1,
  PLAY,
  PAUSED,
  END,
}

export type WithGameState = {
  gameState: GameState;
  isPaused: () => boolean;
};
export type GameObject = WithPos & With2dDimensions & WithDraw2d;
export class NoPhysicsEngine extends Error {}

export class GameEngine implements WithLogger, WithGameState {
  logger: Logger;
  gameState: GameState;
  private _physicsEngine: PhysicsEngine | undefined = undefined;
  private balls: Ball[];
  private players: Player[] = [];
  private renderCommand: RenderCommand = {
    drawables: [],
  };

  public constructor(logger: Logger = new GameLogger()) {
    this.gameState = GameState.INIT;
    this.balls = [];
    this.logger = logger;
  }

  set physicsEngine(physicsEngine: PhysicsEngine) {
    this._physicsEngine = physicsEngine;
  }

  get physicsEngine(): PhysicsEngine | undefined {
    return this._physicsEngine;
  }

  public start() {
    document.addEventListener('keydown', this.keyDownListener.bind(this));
    document.addEventListener('keyup', this.keyUpListener.bind(this));
    this.gameState = GameState.PLAY;
    this.logger.info('Game started');
  }

  public isPaused() {
    return this.gameState === GameState.PAUSED;
  }

  public pause() {
    this.gameState = GameState.PAUSED;
    this.logger.warn('Game paused');
  }

  public resume() {
    if (this.isPaused()) {
      this.gameState = GameState.PLAY;
      this.logger.warn('Game resumed');
    }
  }

  public stop() {
    this.gameState = GameState.END;
    this.logger.error('Game stopped');
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
  public addPlayer(upKey: string, downKey: string, startPos: Vector2d, name: string) {
    if (!this._physicsEngine) {
      throw new NoPhysicsEngine();
    }

    // long but thin Player
    const PlayerDimensions = new Vector2d(20, 150);
    startPos.y -= Math.floor(PlayerDimensions.y / 2);
    startPos.x -= Math.floor(PlayerDimensions.x / 2);
    const newPlayer = new Player(PlayerDimensions.x, PlayerDimensions.y, startPos, new Vector2d(0, 10), name);
    this.players.push(newPlayer);
    this.renderCommand.drawables.push(newPlayer);

    newPlayer.setUpKey(upKey);
    newPlayer.setDownKey(downKey);
  }

  public keyUpListener(event: KeyboardEvent) {
    if (event.isComposing) {
      return;
    }

    if (event.code === 'Space') {
      if (this.gameState === GameState.PLAY) {
        this.pause();
      } else {
        this.resume();
      }
      return;
    }

    for (let player of this.players) {
      if (event.key !== player.upKey && event.key !== player.downKey) {
        continue;
      }

      event.preventDefault();

      if (event.key === player.upKey) {
        player.upKeyPressed = false;
      } else {
        player.downKeyPressed = false;
      }
      return;
    }
  }

  public keyDownListener(event: KeyboardEvent) {
    for (let player of this.players) {
      if (event.key !== player.upKey && event.key !== player.downKey) {
        continue;
      }

      if (event.isComposing) {
        return;
      }
      event.preventDefault();

      if (event.key === player.upKey) {
        player.upKeyPressed = true;
      } else {
        player.downKeyPressed = true;
      }
      return;
    }
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
    document.removeEventListener('keydown', this.keyDownListener);
    document.removeEventListener('keyup', this.keyUpListener);
  }
}
