import Link from 'next/link';
import React from 'react';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';

const Footer: React.FunctionComponent = () => {
  return (
    <footer className="w-full relative h-20">
      <section className="text-md text-zinc-200 bg-gradient-to-t dark:from-black dark:via-black bottom-0 text-right items-end h-20 fixed w-full px-4 pb-4 flex gap-4 flex-row-reverse">
        <Link passHref={true} target="_blank" href="https://github.com/anirvanBhaduri">
          <FaGithub className="text-2xl"></FaGithub>
        </Link>
        <Link passHref={true} target="_blank" href="https://www.linkedin.com/in/anirvanb/">
          <FaLinkedinIn className="text-2xl"></FaLinkedinIn>
        </Link>
      </section>
    </footer>
  );
};

export default Footer;
