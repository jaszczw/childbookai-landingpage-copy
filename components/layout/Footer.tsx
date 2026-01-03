"use client";

import Link from "next/link";
import { footerSections, socialMediaLinks } from "@/lib/data/footer";
import {
  TwitterIcon,
  InstagramIcon,
  YouTubeIcon,
  DiscordIcon,
  EmailIcon,
} from "@/components/shared/social-icons";
import { SocialIcon } from "@/components/shared/SocialIcon";

const socialIconMap = {
  "Twitter/X": TwitterIcon,
  Instagram: InstagramIcon,
  YouTube: YouTubeIcon,
  Discord: DiscordIcon,
  Email: EmailIcon,
};

export function Footer() {
  return (
    <footer className="relative w-full flex items-end pb-8 md:pb-12 -mt-28">
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start justify-center">
          <div className="relative w-full lg:w-auto shrink-0">
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 723 237"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M0.172489 61.1668C-1.94838 38.1553 15.8152 18.1392 38.9156 17.5106L681.876 0.0150661C707.306 -0.67691 726.913 22.2333 722.301 47.2514L697.113 183.897C693.696 202.434 677.801 216.07 658.96 216.628L53.8224 234.558C32.7071 237.184 14.7453 219.282 12.8066 198.247L0.172489 61.1668Z"
                fill="white"
              />
            </svg>
            <div className="relative z-10 p-8 md:p-12 mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 text-center px-8">
                {footerSections.map((section) => (
                  <div key={section.title}>
                    <h3 className="text-heading-sm font-bold text-foreground mb-6">
                      {section.title}
                    </h3>
                    <ul>
                      {section.links.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            className="text-body-sm text-foreground hover:text-primary transition-colors"
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

          <div className="relative w-full lg:w-auto shrink-0">
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 493 221"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M25.1019 32.304C28.9313 12.7737 46.5367 -0.970423 66.4126 0.0536261L442.434 19.427C462.181 20.4445 478.222 35.7384 480.179 55.4149L492.225 176.522C494.629 200.694 475.11 221.411 450.839 220.45L38.4289 204.117C13.9102 203.146 -3.96221 180.531 0.75923 156.451L25.1019 32.304Z"
                fill="white"
              />
            </svg>
            <div className="relative z-10 p-8 md:p-12 px-18">
              <h3 className="text-heading-sm font-bold text-foreground mb-6">
                Contact Us
              </h3>
              <div className="flex flex-wrap gap-4">
                {socialMediaLinks.map((social, index) => {
                  const IconComponent = socialIconMap[social.name];
                  return (
                    <SocialIcon
                      key={social.name}
                      name={social.name}
                      href={social.href}
                      ariaLabel={social.ariaLabel}
                      backgroundIndex={index}
                    >
                      <IconComponent className="text-white" />
                    </SocialIcon>
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
