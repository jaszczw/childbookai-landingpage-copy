import Image from "next/image";
// import { DecorativeText } from "@/components/typography/DecorativeText";
import styles from "./Sections.module.css";

interface StepsCard {
  id: number;
  image: string;
  title: string;
  description: string;
}

const steps: StepsCard[] = [
  {
    id: 1,
    image: "/illustrations/step-1.svg",
    title: "Imagine",
    description:
      "Imagine your story or upload a favorite photo.",
  },
  {
    id: 2,
    image: "/illustrations/step-2.svg",
    title: "Watch the Magic",
    description:
      "Our AI brings your child's adventrure to life with art.",
  },
  {
    id: 3,
    image: "/illustrations/step-3.svg",
    title: "Cherish Forever",
    description:
      "Share digitally or order a printed book.",
  },
];

export function Steps() {
  return (
    <section className="relative w-full py-24 mt-36 min-h-[500px]">
      {/* Dashed lines background - full screen width */}
      <div className="absolute left-0 right-0 hidden lg:flex items-center justify-center pointer-events-none z-0" style={{ top: '50%', transform: 'translateY(-35%)' }}>
        <Image
          src="/background/combined-stroke.svg"
          alt=""
          width={1440}
          height={164}
          className="w-full h-auto object-contain"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-heading-xl max-w-5xl mx-auto">
            <span className="inline-flex items-baseline">
              <span className="text-white">
                Creating Your&nbsp;
                <span className="text-primary">Magical Story&nbsp;</span>
                <br />
                in a Easy as 1-2-3
              </span>
            </span>
          </h1>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 py-12">
          {steps.map((step) => (
            <div
              key={step.id}
              className={`relative z-10 flex flex-col items-center text-center ${
                step.id === 2 ? styles.stepColumnOffset : ""
              }`}
            >
              <div className={`relative mb-6 ${
                step.id === 2 ? "w-72 h-72 lg:w-80 lg:h-80" : "w-64 h-64"
              }`}>
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  className="object-contain"
                />
              </div>

              <h3 className="text-heading-md font-bold text-white mb-4 max-w-[275px] mx-auto">
                {step.title}
              </h3>

              <p className="text-white text-body max-w-[270px]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
