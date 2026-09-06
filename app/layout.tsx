import { JetBrains_Mono } from "next/font/google";
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

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-mono">{children}</body>
    </html>
  );
}
