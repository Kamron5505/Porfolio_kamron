import type { Metadata } from "next";
import { Unbounded, Open_Sans, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ParticlesProviderWrapper } from "@/components/home/particles-provider";
import { ParticlesBackground } from "@/components/home/particles-background";
import { I18nProvider } from "@/components/home/i18n-provider";
import { AOSProvider } from "@/components/home/aos-provider";
import { Loader } from "@/components/home/loader";
import { Sidebar } from "@/components/sidebar";
import { JarvisWrapper } from "@/components/jarvis-wrapper";
import "./globals.css";

const unbounded = Unbounded({
  variable: "--font-display",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const openSans = Open_Sans({
  variable: "--font-sans",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Kamron Fazilov — Frontend Developer",
    template: "%s | Kamron Fazilov",
  },
  description:
    "Portfolio of Kamron Fazilov, a passionate frontend developer and Mars IT School intern specializing in React and modern web technologies.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${unbounded.variable} ${openSans.variable} ${jetbrainsMono.variable}`}
      data-theme="dark"
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider>
          <I18nProvider>
            <AOSProvider>
              <Loader />
              <ParticlesProviderWrapper>
                <ParticlesBackground />
                <Navbar />
                <main className="pt-16">{children}</main>
                <Footer />
                <JarvisWrapper />
                <Sidebar />
              </ParticlesProviderWrapper>
            </AOSProvider>
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
