export class Vector2d implements WithPreviousXY {
  public x: number;
  public y: number;
  public previousX: number;
  public previousY: number;

  public constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
    this.previousX = x;
    this.previousY = y;
  }

  public hasChanged() {
    return this.x !== this.previousX || this.y !== this.previousY;
  }
}

export type WithDraw2d = {
  draw: (context: CanvasRenderingContext2D) => void;
};

export type WithPos = {
  pos: Vector2d;
};

export type WithPreviousXY = {
  previousX: number;
  previousY: number;
  hasChanged: () => boolean;
};

export type With2dDimensions = {
  height: number;
  width: number;

  left: number;
  top: number;
  right: number;
  bottom: number;

  previousLeft: number;
  previousTop: number;
  previousRight: number;
  previousBottom: number;
};

export type WithDirectionKeys = {
  upKey?: string;
  upKeyPressed: boolean;
  downKey?: string;
  downKeyPressed: boolean;
};

export type WithSpeed = {
  speed: Vector2d;
};

export type RenderCommand = {
  drawables: WithDraw2d[];
};
