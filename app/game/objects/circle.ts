import { WithPos, Vector2d } from './types';

export class Circle implements WithPos {
  radius: number;
  pos: Vector2d;

  public constructor(radius: number = 1, pos: Vector2d = new Vector2d()) {
    this.radius = radius;
    this.pos = pos;
  }
}
