import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://prathibhadevkar.dev"),
  title: "Rajendran Prathibha Devkar | Software Engineer",
  description: "MSCS Graduate from UT Arlington with 4+ years of experience in Full-Stack and AI/ML.",
  openGraph: {
    title: "Prathibha Devkar Portfolio",
    description: "Applied AI and Robust Software Engineering",
    type: "website",
  },
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
