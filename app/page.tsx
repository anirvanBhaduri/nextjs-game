import React from 'react';

const Home: React.FunctionComponent = () => {
  return (
    <main className="h-full w-full px-4 md:px-10 lg:px-24 flex flex-col grow items-center">
      <section className="profile-image bg-top h-40 w-40 md:h-64 md:w-64 lg:h-64 lg:w-64 bg-cover rounded-full my-10"></section>
      <h1 className="text-5xl text-zinc-100 text-center">
        Welcome to <span className="text-sky-400">{"Anirvan Bhaduri's"}</span> website!
      </h1>
    </main>
  );
};

export default Home;
