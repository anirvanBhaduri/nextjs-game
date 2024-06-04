import React from 'react';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';
import Timeline from './components/Timeline';

const Profile: React.FunctionComponent = () => {
  return (
    <main className="z-[-1] h-full w-full px-10 lg:px-24 my-20 flex flex-col gap-20 items-center">
      <section className="text-md max-w-96 md:max-w-xl lg:max-w-2xl text-zinc-300 text-justify relative">
        <FaQuoteLeft className="absolute -left-6 -top-6"></FaQuoteLeft>I am a Software Engineering professional with 8
        years of experience in the industry, mainly in fullstack development, with a strong foundation in engineering
        and software development principles. I enjoy problem solving and take pride in developing innovative and elegant
        solutions that are robust and of a very high quality. I love working in a team environment and believe
        continuous improvement, mentorship and constantly pushing boundaries is the key to high performing teams.
        <FaQuoteRight className="absolute -bottom-6 -right-6"></FaQuoteRight>
      </section>
      <section className="w-full grow">
        <Timeline />
      </section>
    </main>
  );
};

export default Profile;
