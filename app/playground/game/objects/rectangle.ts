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

  get left(): number {
    return this.pos.x;
  }

  get previousLeft(): number {
    return this.pos.previousX;
  }

  get top(): number {
    return this.pos.y;
  }

  get previousTop(): number {
    return this.pos.previousY;
  }

  get right(): number {
    return this.pos.x + this.width;
  }

  get previousRight(): number {
    return this.pos.previousX + this.width;
  }

  get bottom(): number {
    return this.pos.y + this.height;
  }

  get previousBottom(): number {
    return this.pos.previousY + this.height;
  }

  public draw(context: CanvasRenderingContext2D) {}
}
