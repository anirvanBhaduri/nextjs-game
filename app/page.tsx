import Image from 'next/image';
import React from 'react';

const Home: React.FunctionComponent = () => {
  return (
    <main className="h-full w-full px-4 md:px-10 lg:px-24 flex flex-col grow items-center">
      <div className="relative w-44 h-44 md:h-56 md:w-56 lg:h-56 lg:w-56 rounded-full my-10 overflow-hidden">
        <div className="absolute w-44 h-56 md:h-72 md:w-56 lg:h-72 lg:w-56">
          <Image src="/profile-2.jpg" priority alt="Profile Image" fill={true} sizes="300px" />
        </div>
      </div>

      <h1 className="text-5xl text-zinc-100 text-center">
        Welcome to <span className="text-sky-400">{"Anirvan Bhaduri's"}</span> website!
      </h1>
    </main>
  );
};

export default Home;
