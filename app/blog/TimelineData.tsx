import { TimelineCardProps } from '@/components/timeline/TimelineCard';

export const timelineData: TimelineCardProps[] = [
  {
    title: 'Article from Datch back when I started there',
    children: (
      <>
        <p className="text-sm">
          {
            "Here's a cool little article from back when I started at Datch a few years back! Note that my name is actually 'Anirvan' :)"
          }
        </p>
        <a className="text-sm my-4" href="https://medium.com/datch-posts/meet-anrivan-8136d95e6ea7" target="_blank">
          <span className="italic">https://medium.com/datch-posts/meet-anrivan-8136d95e6ea7</span>
          <img className="py-2 w-96" src="./blog-post-1.png" alt="blog post 1 image" />
        </a>
      </>
    ),
    toTime: new Date('2024/06/05'),
  },
];
