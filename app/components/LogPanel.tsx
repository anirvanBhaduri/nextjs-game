import React from 'react';

/**
 * This component will use the game's context to
 * fetch the logs of what is happening within the
 * game and will display it in a panel, auto-scrolling
 * as it receives more messages.
 *
 */
const LogPanel: React.FunctionComponent = () => {
  return (
    <div className="h-fit w-full rounded-lg bg-blue-800 flex flex-col gap-2 p-4">
      <h2>LogPanel</h2>
      <div className="h-[350px] bg-black">LogContent</div>
    </div>
  );
};

export default LogPanel;
