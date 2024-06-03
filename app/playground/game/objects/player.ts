import { Rectangle } from './rectangle';
import { WithSpeed, Vector2d, WithDirectionKeys, WithName } from './types';

export class Player extends Rectangle implements WithSpeed, WithDirectionKeys, WithName {
  name: string;
  speed: Vector2d;
  upKey?: string;
  downKey?: string;
  upKeyPressed: boolean;
  downKeyPressed: boolean;

  public constructor(
    width: number,
    height: number,
    pos: Vector2d,
    speed: Vector2d = new Vector2d(0, 10),
    name = 'Player'
  ) {
    super(width, height, pos);
    this.speed = speed;
    this.upKeyPressed = false;
    this.downKeyPressed = false;
    this.name = name;
  }

  public draw(context: CanvasRenderingContext2D) {
    context.clearRect(this.pos.previousX, this.pos.previousY, this.width, this.height);

    this.pos.previousX = this.pos.x;
    this.pos.previousY = this.pos.y;

    context.beginPath();
    context.fillStyle = '#ffffff';
    context.rect(this.pos.x, this.pos.y, this.width, this.height);
    context.closePath();
    context.fill();
  }

  public setUpKey(key: string) {
    this.upKey = key;
  }

  public setDownKey(key: string) {
    this.downKey = key;
  }
}
