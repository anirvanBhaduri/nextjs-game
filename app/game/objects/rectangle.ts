import { Vector2d } from './spatial';
import { Draw2d } from './types';

export class Rectangle implements Draw2d {
  width: number;
  height: number;
  pos: Vector2d;

  public constructor(width: number, height: number, pos: Vector2d = new Vector2d()) {
    this.width = width;
    this.height = height;
    this.pos = pos;
  }

  public draw(context: CanvasRenderingContext2D) {}
}
