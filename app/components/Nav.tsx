import React from 'react';
import Image from 'next/image';

const Nav: React.FunctionComponent = () => {
  return (
    <div className="z-10 max-w-5xl items-center justify-between text-sm">
      <div className="fixed w-full left-0 top-0 right-0 flex justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:w-auto lg:border lg:bg-gray-200 lg:dark:bg-zinc-800/30">
        Ping pong game
      </div>
      <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black">
        <a
          className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered By{' '}
          <Image src="/vercel.svg" alt="Vercel Logo" className="dark:invert" width={100} height={24} priority />
        </a>
        <p className="flex p-8">
          Contributors:{' '}
          <a target="_blank" className="ml-2" href="https://github.com/anirvanBhaduri">
            @anirvanBhaduri
          </a>
        </p>
      </div>
    </div>
  );
};

export default Nav;
