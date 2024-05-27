import { With2dDimensions, WithPos, WithSpeed } from './objects/types';

export enum Direction {
  TOP = 1,
  RIGHT,
  BOTTOM,
  LEFT,
}

type Collidable = With2dDimensions & WithPos;
type PartialBall = Collidable & WithSpeed;
type PartialPlayer = Collidable & WithSpeed;

export class PhysicsEngine {
  private gameBoundary: Collidable;

  public constructor(gameBoundary: Collidable) {
    this.gameBoundary = gameBoundary;
  }

  public getGameBoundary() {
    return this.gameBoundary;
  }

  public calculateNextPlayerPosition(player: PartialPlayer) {
    const gameBoundaryCollisions = this.getBoundaryCollisions(player);

    // no boundary collisions, so all good to go
    if (gameBoundaryCollisions.length === 0) {
      return;
    }

    for (let collision of gameBoundaryCollisions) {
      if (collision === Direction.TOP) {
        player.pos.y = this.gameBoundary.pos.y;
      }

      if (collision === Direction.BOTTOM) {
        player.pos.y = this.gameBoundary.pos.y + this.gameBoundary.height - player.height;
      }
    }
  }

  // use the ball object and a time differential to determine the position
  // timeDiff should be in seconds
  public calculateNextBallPosition(ball: PartialBall, timeDiff: number, possibleCollisionObjects: Collidable[]) {
    // simple matrix multiplication with scalar value
    ball.pos.x += ball.speed.x * timeDiff;
    ball.pos.y += ball.speed.y * timeDiff;

    const collisionDirections = this.doTheyCollide(ball, possibleCollisionObjects);
    const gameBoundaryCollisions = this.getBoundaryCollisions(ball);
    const allCollisions = [...collisionDirections, ...gameBoundaryCollisions];

    // no boundary collisions, so all good to go
    if (allCollisions.length === 0) {
      return;
    }

    for (let collision of allCollisions) {
      if ((collision === Direction.TOP && ball.speed.y < 0) || (collision === Direction.BOTTOM && ball.speed.y > 0)) {
        ball.speed.y = -ball.speed.y;
      }

      if ((collision === Direction.LEFT && ball.speed.x < 0) || (collision === Direction.RIGHT && ball.speed.x > 0)) {
        ball.speed.x = -ball.speed.x;
      }
    }
  }

  /**
   * Check if the object provided is within the boundaries
   * of the game.
   *
   * return an array of directions where the collisions occur.
   * Empty if no collisions occur with the boundary
   */
  public getBoundaryCollisions(subject: Collidable): Direction[] {
    const boundaryLeft = this.gameBoundary.pos.x;
    const boundaryRight = this.gameBoundary.pos.x + this.gameBoundary.width;
    const boundaryTop = this.gameBoundary.pos.y;
    const boundaryBottom = this.gameBoundary.pos.y + this.gameBoundary.height;
    const collisions = [];

    if (subject.pos.x < boundaryLeft) {
      collisions.push(Direction.LEFT);
    }

    if (subject.pos.y < boundaryTop) {
      collisions.push(Direction.TOP);
    }

    if (subject.pos.x + subject.width > boundaryRight) {
      collisions.push(Direction.RIGHT);
    }

    if (subject.pos.y + subject.height > boundaryBottom) {
      collisions.push(Direction.BOTTOM);
    }

    return collisions;
  }

  /**
   * Check if one object collides with the other
   *
   * @param rectA
   * @param rectB
   * @returns Direction relative to rectA. So if rectA collides with rectB, it'll say the Direction
   * rectA is colliding with rectB. The inverse direction would be true for rectB.
   */
  public doesOneCollideWithTheOther(rectA: Collidable, rectB: Collidable): Direction[] {
    // first define the boundaries of both rectangles
    const leftA = rectA.pos.x;
    const rightA = rectA.pos.x + rectA.width;
    const topA = rectA.pos.y;
    const bottomA = rectA.pos.y + rectA.height;

    const leftB = rectB.pos.x;
    const rightB = rectB.pos.x + rectB.width;
    const topB = rectB.pos.y;
    const bottomB = rectB.pos.y + rectB.height;

    let collisionDirections: Direction[] = [];

    // check if they even collide at all
    if (leftA > rightB || topA > bottomB || rightA < leftB || bottomA < topB) {
      return collisionDirections;
    }

    if (leftA < rightB) {
      collisionDirections.push(Direction.LEFT);
    }

    if (topA < bottomB) {
      collisionDirections.push(Direction.TOP);
    }

    if (rightA > leftB) {
      collisionDirections.push(Direction.RIGHT);
    }

    if (bottomA > topB) {
      collisionDirections.push(Direction.BOTTOM);
    }

    return collisionDirections;
  }

  /**
   * Check if one game object collides with multiple others
   *
   * @return an array of Directions where the subject collides with others. Empty if none
   */
  public doTheyCollide(subject: Collidable, checkAgainst: Collidable[]): Direction[] {
    return checkAgainst.reduce<Direction[]>((collisions, collidable) => {
      const collisionDirections = this.doesOneCollideWithTheOther(subject, collidable);

      for (let direction of collisionDirections) {
        if (!collisions.includes(direction)) {
          collisions.push(direction);
        }
      }

      return collisions;
    }, []);
  }
}
