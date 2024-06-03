import React from 'react';

const KeyDisplay: React.FunctionComponent<{ letter: string }> = ({ letter }) => {
  return (
    <div className="keyboard-key inline mx-1 text-sm border border-[2px] border-solid border-red-700 rounded-[5px] px-[2px] text-center w-2">
      {letter}
    </div>
  );
};

const HelpText: React.FunctionComponent = () => {
  return (
    <div>
      Simple pong game. Use
      <KeyDisplay letter="w" />
      and
      <KeyDisplay letter="s" />
      to move Up/Down respectively for player 1 (left). Use
      <KeyDisplay letter="i" />
      and
      <KeyDisplay letter="k" />
      to move Up/Down respectively for player 2 (right). Use
      <KeyDisplay letter="space" />
      to pause the game.
    </div>
  );
};

export default HelpText;
