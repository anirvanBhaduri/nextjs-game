import { Circle } from './circle';
import { Rectangle } from './rectangle';
import { WithSpeed, Vector2d } from './types';

export class Ball extends Rectangle implements WithSpeed {
  speed: Vector2d;
  private renderCircle: Circle;

  public constructor(radius: number, pos: Vector2d, speed: Vector2d = new Vector2d(10, 10)) {
    const heightAndWidth = radius * 2;
    super(heightAndWidth, heightAndWidth, pos);
    this.speed = speed;
    this.renderCircle = new Circle(radius);
  }

  public draw(context: CanvasRenderingContext2D) {
    // the ball is leaving a weird trace behind, so we clear very slightly larger
    // than the area the ball takes
    context.clearRect(this.pos.previousX - 1, this.pos.previousY - 1, this.width + 2, this.height + 2);

    this.pos.previousX = this.pos.x;
    this.pos.previousY = this.pos.y;

    context.beginPath();
    context.fillStyle = '#ffffff';

    // arc angles in radians
    context.arc(
      this.pos.x + this.renderCircle.radius,
      this.pos.y + this.renderCircle.radius,
      this.renderCircle.radius,
      0,
      2 * Math.PI
    );

    context.closePath();
    context.fill();
  }
}
