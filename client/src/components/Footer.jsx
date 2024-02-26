import { Footer } from "flowbite-react";
import { ImMail4 } from "react-icons/im";
import { AiFillGithub } from "react-icons/ai";
import { SiLinkedin } from "react-icons/si";
import { Link } from "react-router-dom";
export default function FooterCom() {
  return (
    <Footer container className="border flex flex-col">
      <div className="mt-5 mx-auto  ">
        <Link
          to="/"
          className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white"
        >
           <span className="px-2 py-1 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 rounded-lg text-white">
              Community
              Polling
            </span>
        </Link>
      </div>
        {/* LINKS */}
        <div className="flex mt-12 gap-5 mx-auto   ">
          <div className="btn">
            <a
              href="https://github.com/LapinGit"
              target="_blank"
              rel="noreferrer"
            >
              <AiFillGithub className="btn-icon  text-black-100" />
            </a>
          </div>
          <div className="btn ">
            <a
              href="https://mail.google.com/mail/u/0/?fs=1&to=alfonsolapinoria.work@gmail.com&su=Inquiry&tf=cm"
              target="_blank"
              rel="noreferrer"
            >
              <ImMail4 className="btn-icon  text-black-100" />
            </a>
          </div>
          <div className="btn ">
            <a
              href="https://www.linkedin.com/in/alfonso-aurel-lapinoria-281293250/"
              target="_blank"
              rel="noreferrer"
            >
              <SiLinkedin className="btn-icon  text-black-100" />
            </a>
          </div>
        </div>
      <div className="h-[100px] flex justify-center items-center mt-auto ">
        <p className="text-black-100">Alfonso Aurel Lapinoria | {new Date().getFullYear()}</p>
        </div>
    </Footer>
  );
}
