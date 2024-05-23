import React from 'react';
import { Vector2D } from './game-objects.interface';

export interface BouncingBallProps {
  XLocation: number;
  YLocation: number;

  directionalVector: Vector2D;
  speed: number; // pixels per second
}

const BouncingBall: React.FunctionComponent = (props) => {
  console.log('The bouncing ball is at ', props);

  return <div className="h-3 w-3 rounded-lg bg-white"></div>;
};

export default BouncingBall;
