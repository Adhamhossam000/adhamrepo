import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/nav";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/react";
import BackgroundComponent from "@/components/magicui/back";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Adham AI Image Generator",
  description: "Lightning fast Image Generation by fal.ai",
  authors: [{ name: "fal.ai", url: "https://fal.ai" }],
  metadataBase: new URL("https://fastsdxl.ai"),
  openGraph: {
    images: "/og_thumbnail.jpeg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={inter.className}
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          height: "100vh",
        }}
      >
        <Analytics />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex-1 flex items-center justify-center">
            <BackgroundComponent />
            <div  className="relative z-20 w-full">
              <Nav />
              <div className="fade-in">

              {children}
              </div>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
