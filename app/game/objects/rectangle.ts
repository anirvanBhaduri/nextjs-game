import { WithDraw2d, WithPos, Vector2d, With2dDimensions } from './types';

export class Rectangle implements WithDraw2d, WithPos, With2dDimensions {
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
