import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Fugaz_One, Open_Sans } from "next/font/google";

const opensans = Open_Sans({ subsets: ["latin"] });
const fugazone = Fugaz_One({ subsets: ["latin"], weight: ["400"] });

export const metadata: Metadata = {
  title: "User Cards",
  description: "Developed use NextJS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${opensans.className} antialiased bg-gray-600`}>
        {children}
      </body>
    </html>
  );
}
