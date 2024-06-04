import React from 'react';

export type TimelineCardProps = {
  fromTime?: Date;
  toTime?: Date;
  title: string;
} & React.PropsWithChildren;

const fromDateTimeToString = (dateTime: Date): string => {
  return dateTime.toLocaleString('en-US', { month: 'short', year: 'numeric' });
};

const TimelineCard: React.FunctionComponent<TimelineCardProps> = ({ fromTime, toTime, title, children }) => {
  return (
    <section className="w-full h-full rounded-lg p-4 bg-zinc-900 flex flex-col">
      <div className="flex flex-row">
        {toTime && <p className="text-sm text-pink-600">{fromDateTimeToString(toTime)}</p>}
      </div>
      <h1 className="my-3 text-xl text-sky-400">{title}</h1>
      {children}
      {fromTime && <p className="text-sm mt-5 text-pink-700">{fromDateTimeToString(fromTime)}</p>}
    </section>
  );
};

export default TimelineCard;
