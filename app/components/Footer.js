import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="justify-center flex bg-[#374259] px-5 md:mx-0">
      <div className=" py-10 md:px-12 container w-screen">
        <div className="text-center md:text-left grid grid-cols-2 md:grid-cols-4 justify-between gap-10 lg:gap-16">
          <div className=" col-span-2">
            <p className="header-3 text-[#d8d8d8] drop-shadow-lg">
              Open<span className="text-[#d8d8d8]">Handed</span>
            </p>
            <p className="text-sm text-[#a5a9aa] py-4 md:py-6">
              Bring your ideas to life right away! Create a project to fundraise
              money for your ideal endeavor, or donate to causes that interest
              you to make a difference.
              <br />
              <Link href="/about">
                <span className="font-bold transition duration-300 ease-in-out hover:text-lightGreen">
                  Read more...
                </span>
              </Link>{" "}
            </p>
          </div>
          <div className="col-span-2 grid-cols-3 grid">
            <div className="col-span-1">
              <p className="header-5 text-[#d8d8d8]">Our Team</p>
              <ul className="text-sm text-[#a5a9aa] py-4 md:py-6 list-none inline-block">
                <Link href="https://github.com/aysemerveksv" target="_blank">
                  <li className="py-1 transition hover:text-lightGreen duration-300 ease-in-out">
                    Ayşe Merve Kosova
                  </li>
                </Link>
                <Link href="https://github.com/BalHasun" target="_blank">
                  <li className="py-1 transition hover:text-lightGreen duration-300 ease-in-out">
                    Bal Elsada Hasun
                  </li>
                </Link>
                <Link
                  href="https://github.com/sadikbarisyilmaz"
                  target="_blank"
                >
                  <li className="py-1 transition hover:text-lightGreen duration-300 ease-in-out">
                    Sadik Baris Yilmaz
                  </li>
                </Link>
                <Link href="https://github.com/mhmtnl" target="_blank">
                  <li className="py-1 transition hover:text-lightGreen duration-300 ease-in-out">
                    Mehmet Unlu
                  </li>
                </Link>
                <Link href="https://github.com/kainy01" target="_blank">
                  <li className="py-1 transition hover:text-lightGreen duration-300 ease-in-out">
                    Zainab Salah
                  </li>
                </Link>
              </ul>
            </div>
            <div className="col-span-1 lg:ml-5">
              <p className="header-5 text-[#d8d8d8]">Links</p>
              <ul className="text-sm text-[#a5a9aa] py-4 md:py-6 list-none">
                <Link href="/">
                  <li className="py-1 transition hover:text-lightGreen duration-300 ease-in-out">
                    Home
                  </li>
                </Link>
                <Link href="/projects">
                  <li className="py-1 transition hover:text-lightGreen duration-300 ease-in-out">
                    Projects
                  </li>
                </Link>
              </ul>
            </div>
            <div className="col-span-1">
              <p className="header-5 text-[#d8d8d8]">Join</p>
              <ul className=" py-4 md:py-6 list-none">
                <li className="py-1">
                  <Link
                    href="/signup"
                    className="py-1 transition hover:text-lightGreen duration-300 ease-in-out text-sm text-[#a5a9aa]"
                  >
                    Log In
                  </Link>
                </li>
                <Link href="/profile">
                  <li className="py-1 transition hover:text-lightGreen duration-300 ease-in-out text-sm text-[#a5a9aa]">
                    Profile
                  </li>
                </Link>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
