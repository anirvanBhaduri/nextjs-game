import Link from 'next/link';
import React from 'react';
import { FaHome } from 'react-icons/fa';

const Nav: React.FunctionComponent = () => {
  return (
    <nav className="w-full h-24 z-20">
      <section className="fixed w-full h-24 before:h-24 before:w-full before:content-[''] before:opacity-70 before:fixed before:z-[-1] before:bg-blue-950 flex justify-center md:justify-start lg:justify-start items-center">
        <ul className="px-4 md:px-10 lg:px-24 text-zinc-200 hover:text-zinc-100 flex flex-row gap-10 justify-center md:items-start lg:items-start">
          <li className="transition-scale duration-200 ease-in-out hover:scale-125">
            <Link className="text-2xl" href={'/'}>
              <FaHome></FaHome>
            </Link>
          </li>
          <li className="transition-scale duration-200 ease-in-out hover:scale-125">
            <Link href={'/profile'}>Profile</Link>
          </li>
          <li className="transition-scale duration-200 ease-in-out hover:scale-125">
            <Link href={'/playground'}>Playground</Link>
          </li>
          <li className="transition-scale duration-200 ease-in-out hover:scale-125">
            <Link href={'/blog'}>Blog</Link>
          </li>
        </ul>
      </section>
    </nav>
  );
};

export default Nav;
