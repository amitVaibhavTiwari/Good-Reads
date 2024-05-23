import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";

import { footerLinks } from "../../../../Data";

const Footer = () => {
  const date = new Date().getFullYear();

  return (
    <div className="px-4 py-8 md:pt-14 bg-lime-50 fit-width">
      <div className="flex justify-between flex-wrap gap-8">
        {footerLinks.map((e, i) => {
          return (
            <div className="" key={e.title}>
              <p className="font-semibold mb-2 text-base lg:text-lg">
                {e.title}
              </p>
              <ul className="flex flex-col gap-[.35rem] lg:gap-2">
                {e.links.map((link) => {
                  return (
                    <li
                      className="text-sm lg:text-base cursor-pointer hover:underline"
                      key={link.name}
                    >
                      {link.name}
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col gap-3 pt-10 md:flex-row md:justify-between md:items-center md:pt-12 ">
        <p className="text-xs lg:text-sm">Copyright Ⓒ {date} goodreads, inc.</p>
        <div className="flex items-center gap-3 text-lg lg:text-xl lg:gap-4 ">
          <FaLinkedinIn />
          <FaXTwitter />
          <FaInstagram />
          <FaFacebookF />
        </div>
      </div>
    </div>
  );
};

export default Footer;
