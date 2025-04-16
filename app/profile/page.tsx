import React from 'react';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';
import Timeline from '@/components/timeline/Timeline';
import { timelineData } from './TimelineData';

const Profile: React.FunctionComponent = () => {
  return (
    <main className="h-full w-full px-5 lg:px-24 my-20 flex flex-col gap-20 items-center">
      <section className="text-md max-w-96 md:max-w-xl lg:max-w-2xl text-zinc-300 text-justify relative">
        <FaQuoteLeft className="absolute text-xs -left-3 -top-3 md:-left-6 md:-top-6 lg:-left-6 lg:-top-6"></FaQuoteLeft>
        I am a Software Engineering professional with 9 years of experience in the industry, mainly in fullstack
        development, with a strong foundation in engineering and software development principles. I enjoy problem
        solving and take pride in developing innovative and elegant solutions that are robust and of a very high
        quality. I love working in a team environment and believe continuous improvement, mentorship and constantly
        pushing boundaries is the key to high performing teams.
        <FaQuoteRight className="absolute text-xs -bottom-3 -right-3 md:-bottom-6 md:-right-6 lg:-bottom-6 lg:-right-6"></FaQuoteRight>
      </section>
      <section className="w-full grow">
        <Timeline timelineData={timelineData} />
      </section>
    </main>
  );
};

export default Profile;
