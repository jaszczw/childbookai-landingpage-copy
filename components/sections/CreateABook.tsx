import Image from "next/image";
import { AppButton } from "@/components/shared/AppButton";

const settings = [
  { id: 1, image: "/illustrations/character-1.svg", label: "Wonderland" },
  { id: 2, image: "/illustrations/character-2.svg", label: "Fantasy" },
  { id: 3, image: "/illustrations/character-3.svg", label: "Halloween" },
  { id: 4, image: "/illustrations/character-4.svg", label: "Christmas" },
];

const kids = [
  { id: 1, image: "/illustrations/kid-1.svg", name: "Kid Name" },
  { id: 2, image: "/illustrations/kid-2.svg", name: "Kid Name" },
  { id: 3, image: "/illustrations/kid-3.svg", name: "Kid Name" },
];

export function CreateABook() {
  return (
    <section className="relative w-full py-10 min-h-[500px]">
      {/* SvgWideCard Background */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <svg
          viewBox="0 0 1440 720"
          className="w-full h-full"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path
            d="M1440 80.0008C1440 34.8075 1402.59 -1.41424 1357.42 0.0424087L77.4214 41.3202C34.2648 42.7119 0 78.0997 0 121.279V948.643C0 991.531 33.8195 1026.79 76.6696 1028.57L1356.67 1081.91C1402.12 1083.8 1440 1047.47 1440 1001.98V80.0008Z"
            fill="white"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16 lg:pt-18">
        <div className="text-center mb-4">
          <h1 className="text-heading-xl mb-4">
            <span className="inline-flex items-baseline">
              <span className="text-primary">Let&apos;s Create&nbsp;</span>
              <span className="text-foreground">a Book</span>
            </span>
          </h1>
          <p className="text-heading-sm text-foreground">
            <span className="inline-flex items-baseline">
              <span className="text-foreground">
                Choose character options&nbsp;
              </span>
              <span className="text-primary">1/4</span>
            </span>
          </p>
        </div>

        {/* Three Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_20%] gap-6 mb-4">
          {/* First Column - Setting */}
          <div className="flex flex-col justify-center">
            <h2 className="text-heading-md text-foreground mb-6">Setting</h2>
            <div className="flex flex-col gap-4">
              {settings.map((setting) => (
                <div
                  key={setting.id}
                  className="flex items-center gap-4 cursor-pointer hover:opacity-80 transition-opacity"
                >
                  <div className="relative w-20 h-20 shrink-0">
                    <Image
                      src={setting.image}
                      alt={setting.label}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="text-body text-foreground flex-1 wrap-break-word">
                    {setting.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Second Column - Book Preview */}
          <div className="flex flex-col items-center justify-center">
            <div className="relative w-full max-w-xl aspect-4/3 overflow-visible">
              <Image
                src="/illustrations/Childrens_Book_Mockup_3.svg"
                alt="Book Preview"
                width={1240}
                height={930}
                className="object-contain scale-210 absolute inset-0"
              />
            </div>
          </div>

          {/* Third Column - Kid Photo */}
          <div className="flex flex-col justify-center">
            <h2 className="text-heading-md text-right text-foreground mb-6">
              Kid photo
            </h2>
            <div className="flex flex-col gap-4">
              {kids.map((kid) => (
                <div
                  key={kid.id}
                  className="flex items-center gap-4 cursor-pointer hover:opacity-80 transition-opacity"
                >
                  <span className="text-body text-foreground flex-1 wrap-break-word text-right">
                    {kid.name}
                  </span>
                  <div className="relative w-20 h-20 shrink-0">
                    <Image
                      src={kid.image}
                      alt={kid.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              ))}
              <div className="flex items-center gap-4 cursor-pointer hover:opacity-80 transition-opacity">
                <span className="text-body text-foreground flex-1 wrap-break-word text-right">
                  <span className="text-primary">Sign Up&nbsp;</span>& use your
                  photo
                </span>
                <div className="relative w-20 h-20 shrink-0">
                  <Image
                    src="/illustrations/plus-icon.svg"
                    alt="Add photo"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Next Step Button */}
        <div className="flex justify-center">
          <AppButton size="md" shadow className="w-[190px] text-heading-sm">
            Next Step
          </AppButton>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 z-1 w-full max-w-full overflow-hidden"
        style={{
          transform: "translateY(40%)",
        }}
      >
        <div
          className="relative w-full mx-auto"
          style={{ aspectRatio: "1440/330", maxWidth: "100%" }}
        >
          <Image
            src="/background/inverted-cloud.svg"
            alt=""
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
}
