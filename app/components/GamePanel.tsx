import React from 'react';
import BouncingBall from './BouncingBall';

export interface GamePanelProps {}

const GamePanel: React.FunctionComponent<GamePanelProps> = () => {
  return (
    <div className="h-[450px] w-full rounded-lg bg-gray-700 flex flex-col gap-2 p-4">
      <h2>GamePanel</h2>
      <div className="grow bg-black">
        GameContent
        <BouncingBall />
      </div>
    </div>
  );
};

export default GamePanel;
