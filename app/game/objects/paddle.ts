import { Rectangle } from './rectangle';
import { WithSpeed, Vector2d, WithDirectionKeys } from './types';

export class Paddle extends Rectangle implements WithSpeed, WithDirectionKeys {
  speed: Vector2d;
  upKey?: string;
  downKey?: string;

  public constructor(width: number, height: number, pos: Vector2d, speed: Vector2d = new Vector2d(0, 10)) {
    super(width, height, pos);
    this.speed = speed;
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

  public upKeyListener(event: KeyboardEvent) {
    if (event.key !== this.upKey) return;

    if (event.isComposing) {
      return;
    }

    event.preventDefault();
    this.pos.y -= this.speed.y;
  }

  public downKeyListener(event: KeyboardEvent) {
    if (event.key !== this.downKey) return;

    if (event.isComposing) {
      return;
    }

    event.preventDefault();
    this.pos.y += this.speed.y;
  }
}
