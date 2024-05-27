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
  onDestroy?: () => void;
};

/**
 * Resize the canvas based on the current window's aspect ratio.
 *
 * @param canvas
 */
export const resizeCanvas = (canvas: HTMLCanvasElement): undefined => {
  const { width, height } = canvas.getBoundingClientRect();

  // TODO: consider use of CSS transform to scale canvas
  if (canvas.width === width && canvas.height === height) {
    return;
  }

  const { devicePixelRatio: ratio = 1 } = window;
  canvas.width = width * ratio;
  canvas.height = height * ratio;
};

const use2dRenderingEngine = (renderCommands: RenderCommand, options?: RenderingEngineOptions2d) => {
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

    const context = canvas.getContext('2d', { alpha: false });
    if (!context) return;

    resizeCanvas(canvas);
    options?.init?.(canvas, context);

    let animationFrameId: number;

    const render = (currentRenderTime?: number) => {
      options?.beforeRender?.(canvas, context, lastRenderTime, currentRenderTime);

      for (let drawable of renderCommands.drawables) {
        drawable.draw(context);
      }

      options?.afterRender?.(canvas, context, lastRenderTime, currentRenderTime);

      if (currentRenderTime) lastRenderTime = currentRenderTime;
      animationFrameId = window.requestAnimationFrame(render);
    };

    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      options?.onDestroy?.();
    };
  }, []);

  return canvasRef;
};

export default use2dRenderingEngine;
