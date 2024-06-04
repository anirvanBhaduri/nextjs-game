import React from 'react';
import TimelineCard, { TimelineCardProps } from './TimelineCard';

export type TimelineProps = {
  timelineData: TimelineCardProps[];
  alternatingDisplay?: boolean;
};

const Timeline: React.FunctionComponent<TimelineProps> = ({ timelineData, alternatingDisplay = true }) => {
  const timelineCards = timelineData.map((data, index) => {
    const isEven = index % 2 === 0;
    const isOdd = !isEven;

    return (
      <React.Fragment key={data.title}>
        {alternatingDisplay && (
          <div className="hidden md:grid lg:grid md:col-span-5 lg:col-span-5 mb-0">
            {isOdd && <TimelineCard {...data} />}
          </div>
        )}
        <div className="col-span-1">
          <div className="w-[3px] mx-auto bg-zinc-200 h-full relative before:absolute before:-top-0 before:left-1/2 before:h-[15px] before:w-[15px] before:-translate-x-2/4 before:rounded-full before:content-[''] before:bg-zinc-200 before:z-1"></div>
        </div>
        {alternatingDisplay && (
          <div className="hidden md:grid lg:grid col-span-10 md:col-span-5 lg:col-span-5 mb-0">
            {isEven && <TimelineCard {...data} />}
          </div>
        )}
        <div className={`col-span-10 ${alternatingDisplay && 'md:hidden lg:hidden'} mb-8 last:mb-0`}>
          {<TimelineCard {...data} />}
        </div>
      </React.Fragment>
    );
  });

  return <div className="grid grid-cols-11">{timelineCards}</div>;
};

export default Timeline;
