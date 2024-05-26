This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Game Design (Pseudo Code)

The below section contains details about the planning I went through before actually writing any code:

```txt
Ping Pong Game - React, Next.js (for fun lols) and finally websockets
Pong

We can use this website for some lookups - https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258
Its got some useEffect stuff that seems useful

This github repo has some cool concepts for rendering using canvas - https://github.com/Flipboard/react-canvas
Might use it for inspiration, but ideally I want to write the rendering logic myself.

Game design:

We have the canvas itself - this is where everything is rendered and we want to draw 60fps

State objects:
- could represent each drawable object on the canvas with a distinct name and have an INSTANCE of that drawable object, giving it some initial values.
- this instance will also have a render method, which will take its internal values and a canvas context and simply draw (this is what we’ll pass to the renderer)

Game state object:
- this will contain the games rules WIN, LOSS and recognising when the physics engine spits out something that should result in a WIN/LOSS
- this will hold ONE instance of the physics engine
- this will have reference to all game objects
- this is what determines the boundaries of where a game object can be and will pass that to the physics engine. (or maybe the boundaries can be stored as some matrix within the game objects themselves)
- if a game object is to be removed, the game object can issue it to be removed, but ONLY when the object is said to be REMOVABLE by the physics engine, WHY, because the object needs to be removed in the next render, THEN its reference can be destroyed. SO we need some lifecycle events for the game itself
- LIFECYCLE events
    - init
    - calculate
    - pre-render - calculate and pre-render could almost be the same lifecycle event. Let’s see
    - render
    - post-render
    - destroy

I/O objects:
- a key press
- mouse movement
- timer based update (e.g. for the ball)

Physics engine:
- this will have reference to the canvas size
- this will have reference to every object that can possibly go on the canvas
- this will place the constraints of what can go on the canvas
- this will place the constraints of where objects can move on the canvas, if at all
- this will provide methods to spit out all objects that need an update of position based on provided objects and I/O - only objects that were spit out will be passed to the renderer to render

How will we ensure we only render 60 fps and not more or less?
- it likely wont be an issue if we render more than 60fps (apart from extra compute power being used)
- need to figure out a way to mark a game object’s render method to require it to be called (similar to how useEffect in react works) as this is essentially what the physics engine will do
- at a time interval slightly less than 1/60 (so a perpetual setTimeout to cause a re-render, or recursive method call with some delay, we need a time slightly less than 1/60 as there’s no guarantee of when the callback will run, we can only be sure it WONT run BEFORE 1/60), we can simply call the render method, which will simply run the render method of all game objects MARKED for render, then setting the game object back to RENDERED or whatever state name we give it
```

## Developer Notes
