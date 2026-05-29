import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { sans, serifDisplay } from "@/app/fonts";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/reveal";
import { JsonLd } from "@/components/json-ld";
import { localBusinessSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import "./globals.css";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export const metadata: Metadata = buildMetadata();

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${serifDisplay.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js-ready')",
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <JsonLd data={localBusinessSchema()} />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Reveal />
      </body>
      {/*
        Render GA only when a Measurement ID is configured. In dev /
        preview builds without the env var, no GA script tag exists and
        no events fire — keeps test traffic out of the production
        property. The component is from @next/third-parties and handles
        the standard gtag.js + dataLayer + config bootstrap; it also
        respects Next.js's afterInteractive script-load strategy.
      */}
      {GA_MEASUREMENT_ID ? <GoogleAnalytics gaId={GA_MEASUREMENT_ID} /> : null}
    </html>
  );
}
