import React from 'react';
import Timeline from '@/components/timeline/Timeline';
import { timelineData } from './TimelineData';

const Profile: React.FunctionComponent = () => {
  return (
    <main className="h-full w-full px-5 lg:px-24 my-10 flex flex-col gap-10 items-center">
      <h1 className="text-2xl font-bold">Blog</h1>
      <section className="w-full grow">
        <Timeline timelineData={timelineData} alternatingDisplay={false} />
      </section>
    </main>
  );
};

export default Profile;
