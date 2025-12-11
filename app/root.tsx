// root.tsx
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import type { LinksFunction, MetaFunction } from "react-router";

import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";

// KEEP Mantine CSS so components render correctly
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

// Keep Tailwind + app styles
import "./tailwind-output.css";
import "./app.css";

/**
 * Note:
 * - We removed @fontsource imports (render-blocking) and replaced with
 *   Google Fonts (non-blocking swap).
 * - Make sure /public/bannerhero.png exists (preloaded LCP image).
 */

export const links: LinksFunction = () => [];
export const meta: MetaFunction = () => [
  { title: "Fynocrat – SEBI Registered Stock Research for Serious Investors" },
  {
    name: "description",
    content:
      "Gain access to data-driven stock research and high-conviction stock ideas from a SEBI-registered research desk. Sign up to receive our next stock idea.",
  },
  { name: "viewport", content: "width=device-width,initial-scale=1" },
];

export default function Root() {
  const domain = "https://lp.fynocrat.com";
  const title =
    "Fynocrat – SEBI Registered Stock Research for Serious Investors";
  const description =
    "Gain access to data-driven stock research and high-conviction stock ideas from a SEBI-registered research desk. Sign up to receive our next stock idea.";
  const theme: any = {
    colorScheme: "dark",
    fontFamily: "Poppins, Inter, system-ui, -apple-system, sans-serif",
    headings: { fontFamily: "Poppins, sans-serif" },
    primaryColor: "blue",
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: domain,
    name: "Fynocrat",
    description: description,
  };

  return (
    <html lang="en">
      <head>
        <Meta />

        {/* Minimal critical CSS (inline) — keeps first paint stable and reduces render-blocking */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              /* Critical CSS — keep minimal, only above-the-fold essentials */
              *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
              html, body { height: 100%; background: #000; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
              body { font-family: Poppins, Inter, system-ui, -apple-system, sans-serif; }
              img { display: block; max-width: 100%; height: auto; }
              .success-popup { position: fixed; top: 24px; left: 50%; transform: translateX(-50%); background: rgba(0,0,0,0.8); color: #fff; padding: 10px 18px; border-radius: 8px; z-index: 9999; }
              /* Basic hero sizing so the LCP image has layout to fill */
              .hero-root { position: relative; width: 100%; min-height: 100vh; overflow: hidden; }
            `,
          }}
        />

        {/* SEO / Social meta */}
        <link rel="canonical" href={domain} />
        <meta name="description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={domain} />
        <meta property="og:site_name" content="Fynocrat" />
        {/* Replace with a proper absolute OG image path if you have one */}
        <meta property="og:image" content={`${domain}/bannerhero.png`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={`${domain}/bannerhero.png`} />

        {/* Structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Preconnect for Google Fonts (improves font fetch) */}
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />

        {/* Google Fonts - display=swap to avoid blocking text paint */}
        {/* PRELOAD Google Fonts stylesheet (non-blocking) */}
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap"
          as="style"
        />

        {/* Load stylesheet async (non-blocking) */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap"
          media="print"
          onLoad={(e) => {
            e.currentTarget.media = "all";
          }}
        />

        {/* PRELOAD root.css */}
        <link rel="preload" href="/assets/root-CcBiwDjd.css" as="style" />

        {/* ASYNC LOAD root.css */}
        <link
          rel="stylesheet"
          href="/assets/root-CcBiwDjd.css"
          media="print"
          onLoad={(e) => {
            e.currentTarget.media = "all";
          }}
        />

        {/* Preload the LCP hero image so the browser discovers it early */}
        <link
          rel="preload"
          href="/bannerhero.png"
          as="image"
          fetchPriority="high"
        />

        {/* Keep Remix/React Router injected links after our critical preloads */}
        <Links />
      </head>
      <body className="bg-black text-white">
        <MantineProvider theme={theme}>
          <ModalsProvider>
            <Notifications />
            <Outlet />
          </ModalsProvider>
        </MantineProvider>

        {/* app-level restoration / scripts */}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
