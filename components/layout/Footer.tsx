"use client";

import Link from "next/link";
import { footerSections, socialMediaLinks } from "@/lib/data";
import {
  TwitterIcon,
  InstagramIcon,
  YouTubeIcon,
  DiscordIcon,
  EmailIcon,
  SocialIcon,
} from "@/components/shared";

const socialIconMap = {
  "Twitter/X": TwitterIcon,
  Instagram: InstagramIcon,
  YouTube: YouTubeIcon,
  Discord: DiscordIcon,
  Email: EmailIcon,
};

export function Footer() {
  return (
    <footer className="relative w-full flex items-end pb-8 md:pb-12 lg:-mt-28">
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col xl:flex-row gap-6 md:gap-8 lg:gap-10 items-center justify-center">
          {/* Left footer card - keeps shape but scales like the hero carousel mask */}
          <div className="relative w-full max-w-[723px] lg:max-w-[723px] aspect-723/400 min-[500px]:aspect-723/237 shrink-0">
            {/* Taller SVG for screens below 500px - extended vertical design */}
            <svg
              className="absolute inset-0 w-full h-full max-[500px]:block hidden"
              viewBox="0 0 723 400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid meet"
              aria-hidden="true"
            >
              <path
                d="M0.172489 120C-1.94838 80 15.8152 40 38.9156 35L681.876 5C707.306 3 726.913 45 722.301 90L697.113 320C693.696 360 677.801 390 658.96 395L53.8224 395C32.7071 395 14.7453 365 12.8066 330L0.172489 120Z"
                fill="white"
              />
            </svg>
            {/* Original SVG for screens 500px and above */}
            <svg
              className="absolute inset-0 w-full h-full hidden min-[500px]:block"
              viewBox="0 0 723 237"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid meet"
              aria-hidden="true"
            >
              <path
                d="M0.172489 61.1668C-1.94838 38.1553 15.8152 18.1392 38.9156 17.5106L681.876 0.0150661C707.306 -0.67691 726.913 22.2333 722.301 47.2514L697.113 183.897C693.696 202.434 677.801 216.07 658.96 216.628L53.8224 234.558C32.7071 237.184 14.7453 219.282 12.8066 198.247L0.172489 61.1668Z"
                fill="white"
              />
            </svg>
            <div className="relative z-10 h-full flex items-center justify-center p-3 sm:p-5 md:p-7 lg:p-9">
              <div className="grid grid-cols-3 gap-1 sm:gap-2 md:gap-4 lg:gap-8 text-center w-full">
                {footerSections.map((section) => (
                  <div key={section.title}>
                    <h3 className="text-[10px] sm:text-xs md:text-sm lg:text-base font-bold text-foreground mb-1.5 sm:mb-2 md:mb-3 lg:mb-4">
                      {section.title}
                    </h3>
                    <ul className="-space-y-1 sm:space-y-0">
                      {section.links.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            className="text-[9px] sm:text-[10px] md:text-xs lg:text-sm text-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary rounded-sm"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right footer card - also scales proportionally with viewport width */}
          <div className="relative w-full max-w-[493px] lg:max-w-[493px] aspect-493/221 shrink-0">
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 493 221"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid meet"
              aria-hidden="true"
            >
              <path
                d="M25.1019 32.304C28.9313 12.7737 46.5367 -0.970423 66.4126 0.0536261L442.434 19.427C462.181 20.4445 478.222 35.7384 480.179 55.4149L492.225 176.522C494.629 200.694 475.11 221.411 450.839 220.45L38.4289 204.117C13.9102 203.146 -3.96221 180.531 0.75923 156.451L25.1019 32.304Z"
                fill="white"
              />
            </svg>
            <div className="relative z-10 h-full flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 lg:p-10">
              <h3 className="text-xs sm:text-sm md:text-base lg:text-heading-sm font-bold text-foreground mb-2 sm:mb-3 md:mb-4 lg:mb-5">
                Contact Us
              </h3>
              <div className="flex flex-wrap gap-1.5 sm:gap-2 md:gap-3 lg:gap-4 justify-center">
                {socialMediaLinks.map((social, index) => {
                  const IconComponent = socialIconMap[social.name];
                  return (
                    <div key={social.name} className="scale-75 sm:scale-90 md:scale-100">
                      <SocialIcon
                        name={social.name}
                        href={social.href}
                        ariaLabel={social.ariaLabel}
                        backgroundIndex={index}
                      >
                        <IconComponent className="text-white" />
                      </SocialIcon>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
