import type { Metadata } from "next";
import { Baloo_2 } from "next/font/google";
import "./globals.css";

const baloo = Baloo_2({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-baloo",
});

export const metadata: Metadata = {
  title: "Home | Childbook.ai",
  description: "Create personalized AI-generated children's books with unique illustrations and stories. Bring your child's imagination to life with our easy-to-use book creator.",
  icons: {
    icon: "/logo.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className={`${baloo.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
