import React from 'react';

export type TimelineCardProps = {
  fromTime: Date;
  toTime: Date;
  title: string;
} & React.PropsWithChildren;

const fromDateTimeToString = (dateTime: Date): string => {
  return '2024';
};

const TimelineCard: React.FunctionComponent<TimelineCardProps> = ({ fromTime, toTime, title, children }) => {
  return (
    <section className="w-full h-full rounded-lg p-4 bg-zinc-900 flex flex-col">
      <div className="flex flex-row">
        <p className="text-sm">{fromDateTimeToString(toTime)}</p>
        {/* <p>{fromDateTimeToString(fromTime)}</p> */}
      </div>
      <h1 className="my-3 text-xl text-sky-400">{title}</h1>
      {children}
    </section>
  );
};

export default TimelineCard;
