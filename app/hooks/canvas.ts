import { useRef, useEffect } from 'react';
import { PhysicsEngine } from '../game/physics-engine';
import { Rectangle } from '../game/objects/rectangle';
import { Ball } from '../game/objects/ball';

export type CanvasOptions = {
  context?: string;
};

export const resizeCanvas = (canvas: HTMLCanvasElement): undefined => {
  const { width, height } = canvas.getBoundingClientRect();

  if (canvas.width !== width || canvas.height !== height) {
    const { devicePixelRatio: ratio = 1 } = window;
    canvas.width = width * ratio;
    canvas.height = height * ratio;
  }
};

const useCanvas = (renderingObject: Ball) => {
  const canvasRef = useRef(null);

  let physicsEngine: PhysicsEngine;

  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement | null;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    // TODO: pass this in as an option
    resizeCanvas(canvas);

    // TODO: physics engine will need to be updated if the canvas size changes
    if (!physicsEngine) {
      physicsEngine = new PhysicsEngine(new Rectangle(canvas.width, canvas.height));
    }

    let animationFrameId: number;
    let lastRenderTime: number;

    const render = (renderTime?: number) => {
      if (lastRenderTime && renderTime) {
        // TODO: need to pass an option to do the physics calculation before this step
        physicsEngine.calculateNextBallPosition(renderingObject, (renderTime - lastRenderTime) / 1000, []);
      }

      if (renderTime) lastRenderTime = renderTime;

      context.fillStyle = '#000000';
      context.fillRect(0, 0, context.canvas.width, context.canvas.height);
      renderingObject.draw(context);
      animationFrameId = window.requestAnimationFrame(render);
    };

    render();
    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [renderingObject.draw]);

  return canvasRef;
};

export default useCanvas;
