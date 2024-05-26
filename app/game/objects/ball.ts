import { Rectangle } from './rectangle';
import { Vector2d } from './spatial';
import { Draw2d } from './types';

export class Ball extends Rectangle implements Draw2d {
  speed: Vector2d;

  public constructor(width: number, height: number, pos: Vector2d, speed: Vector2d = new Vector2d(10, 10)) {
    super(width, height, pos);
    this.speed = speed;
  }

  public draw(context: CanvasRenderingContext2D) {
    context.beginPath();
    context.fillStyle = '#ffffff';
    context.fillRect(this.pos.x, this.pos.y, this.width, this.height);
    context.fill();
  }
}
