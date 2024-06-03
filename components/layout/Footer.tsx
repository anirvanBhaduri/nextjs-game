import React from 'react';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';

const Footer: React.FunctionComponent = () => {
  return (
    <footer className="w-full relative h-10">
      <section className="text-md text-zinc-200 bottom-0 text-right align-center h-10 fixed w-full px-4 flex gap-4 flex-row-reverse">
        <a target="_blank" href="https://github.com/anirvanBhaduri">
          <FaGithub className="text-2xl"></FaGithub>
        </a>
        <a target="_blank" href="https://www.linkedin.com/in/anirvanb/">
          <FaLinkedinIn className="text-2xl"></FaLinkedinIn>
        </a>
      </section>
    </footer>
  );
};

export default Footer;
