export class Vector2d {
  public x: number;
  public y: number;

  public constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
}

export type WithDraw2d = {
  draw: (context: CanvasRenderingContext2D) => void;
};

export type WithPos = {
  pos: Vector2d;
};

export type With2dDimensions = {
  height: number;
  width: number;
};

export type WithSpeed = {
  speed: Vector2d;
};

export type RenderCommand = {
  fillStyle: string;
  drawables: WithDraw2d[];
};
