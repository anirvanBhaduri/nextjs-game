import { TimelineCardProps } from './TimelineCard';

export const timelineData: TimelineCardProps[] = [
  {
    title: 'Senior Software Engineer',
    children: (
      <>
        <a href="https://www.datch.io/" target="_blank" className="text-xs font-bold mb-3">
          Datch Inc., New Zealand
        </a>
        <ul className="text-sm pl-4 leading-6 text-wrap">
          <li className="list-disc">
            Mentored team members, resulting in a significant improvement in the quality of their contributions.
          </li>
          <li className="list-disc">
            Implemented device to server sync strategies using CRDTs, enabling offline-first features for the mobile
            application.
          </li>
          <li className="list-disc">Introduced use of DDD and Event Storming for multi-team projects.</li>
          <li className="list-disc">
            Maintained microservices (Node.js, MongoDB) via Kubernetes, Helm charts and GitLab CI.
          </li>
          <li className="list-disc">
            Championed queuing system in Angular/Ionic mobile apps for offline updates and online sync.
          </li>
          <li className="list-disc">
            Implemented OIDC for web application, solving authentication and authorization issues.
          </li>
          <li className="list-disc">Established code review processes, improving maintainability.</li>
          <li className="list-disc">Implemented voice navigation classifiers using GPT-4 and an offline NLP engine.</li>
          <li className="list-disc">Adapted agile Scrum processes to suit the team, fostering high performance.</li>
        </ul>
      </>
    ),
    toTime: new Date('2024 Feb'),
    fromTime: new Date('2021 June'),
  },
  {
    title: 'Intermediate Software Engineer',
    children: (
      <>
        <a href="https://www.justeattakeaway.com/" target="_blank" className="text-xs font-bold mb-3">
          JustEatTakeaway.com, Germany
        </a>
        <ul className="text-sm pl-4 leading-6 text-wrap">
          <li className="list-disc">Architected and implemented scalable, secure Zendesk Apps infrastructure.</li>
          <li className="list-disc">Automated service deployments with Kubernetes, Helm charts, and GitLab CI.</li>
          <li className="list-disc">
            Drove migration to Laravel microservices and Vue.js as part of an org-wide tech migration initiative.
          </li>
          <li className="list-disc">
            Improved the Customer Help Centre (Next.js, React) for easy content updates by the Customer Services team.
          </li>
          <li className="list-disc">
            Accelerated customer service ticket resolution by connecting operations and customer service teams via a
            Slack Bot.
          </li>
          <li className="list-disc">
            Embedded analytics in microservices and frontends to address traffic bursts and bottlenecks, reducing
            customer service response times.
          </li>
          <li className="list-disc">Enhanced team processes in an agile Scrum environment.</li>
        </ul>
      </>
    ),
    toTime: new Date('2021 April'),
    fromTime: new Date('2019 Feb'),
  },
  {
    title: 'Junior/Intermediate Software Engineer',
    children: (
      <>
        <a href="https://www.ezyvet.com/" target="_blank" className="text-xs font-bold mb-3">
          ezyVet, New Zealand
        </a>
        <ul className="text-sm pl-4 leading-6 text-wrap">
          <li className="list-disc">
            Designed and implemented the ezyVet external API for third-party integrations (Node.js, Lumen/Laravel, AWS
            serverless), securing over 20 integrations and handling legal work.
          </li>
          <li className="list-disc">Managed API communication and assisted third parties with integration.</li>
          <li className="list-disc">Improved scalability of API infrastructure.</li>
          <li className="list-disc">Optimized API database queries and proved performance gains via stress tests.</li>
          <li className="list-disc">
            Improved delivery and customer service SLAs by migrating API-related tasks to other departments.
          </li>
        </ul>
      </>
    ),
    toTime: new Date('2019 Feb'),
    fromTime: new Date('2017 May'),
  },
  {
    title: 'Freelancer',
    children: (
      <>
        <p className="text-xs font-bold mb-3">New Zealand</p>
      </>
    ),
    toTime: new Date('2017 May'),
    fromTime: new Date('2016 July'),
  },
  {
    title: 'Junior Software Engineer',
    children: (
      <>
        <a href="https://gentrack.com/" target="_blank" className="text-xs font-bold mb-3">
          Gentrack, New Zealand
        </a>
      </>
    ),
    toTime: new Date('2016 July'),
    fromTime: new Date('2015 Feb'),
  },
];
