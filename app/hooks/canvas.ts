import { useRef, useEffect } from 'react';
import { RenderCommand } from '../game/objects/types';

export type RenderInitMethod = (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) => void;

export type RenderLifeCycleMethod = (
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
  previousRenderFrameTime?: number,
  currentRenderFrameTime?: number
) => void;

export type RenderingEngineOptions2d = {
  init?: RenderInitMethod;
  beforeRender?: RenderLifeCycleMethod;
  afterRender?: RenderLifeCycleMethod;
};

/**
 * Resize the canvas based on the current window's aspect ratio.
 *
 * @param canvas
 */
export const resizeCanvas = (canvas: HTMLCanvasElement): undefined => {
  const { width, height } = canvas.getBoundingClientRect();

  if (canvas.width !== width || canvas.height !== height) {
    const { devicePixelRatio: ratio = 1 } = window;
    canvas.width = width * ratio;
    canvas.height = height * ratio;
  }
};

const use2dRenderingEngine = (renderCommands: RenderCommand[], options?: RenderingEngineOptions2d) => {
  const canvasRef = useRef(null);

  let lastRenderTime: number | undefined;

  // we want to make sure we set the last render time to
  // undefined when moving away from the screen, otherwise
  // the difference between last and current render time
  // can become HUGE.
  useEffect(() => {
    const visibilityListener = () => {
      if (document.hidden) {
        lastRenderTime = undefined;
      }
    };

    // Check for browser support
    if (typeof document.hidden !== 'undefined') {
      document.addEventListener('visibilitychange', visibilityListener);
    }

    return () => {
      document.removeEventListener('visibilitychange', visibilityListener);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement | null;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    resizeCanvas(canvas);
    options?.init?.(canvas, context);

    let animationFrameId: number;

    const render = (currentRenderTime?: number) => {
      options?.beforeRender?.(canvas, context, lastRenderTime, currentRenderTime);

      // paint the canvas fully black
      context.fillStyle = '#000000';
      context.fillRect(0, 0, context.canvas.width, context.canvas.height);

      for (let renderCommand of renderCommands) {
        context.fillStyle = renderCommand.fillStyle;

        for (let drawable of renderCommand.drawables) {
          drawable.draw(context);
        }

        if (renderCommand.drawables.length > 0) {
          context.fill();
        }
      }

      options?.afterRender?.(canvas, context, lastRenderTime, currentRenderTime);

      if (currentRenderTime) lastRenderTime = currentRenderTime;
      animationFrameId = window.requestAnimationFrame(render);
    };

    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return canvasRef;
};

export default use2dRenderingEngine;
