// root.tsx
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "react-router";
import type { LinksFunction, MetaFunction } from "react-router";
import { useEffect } from "react";

import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";

import "@fontsource/poppins/400.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";

import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "./tailwind-output.css";
import "./app.css";

export const links: LinksFunction = () => [];
export const meta: MetaFunction = () => [
  { title: "Fynocrat Landing" },
  { name: "viewport", content: "width=device-width,initial-scale=1" },
];

/* ---------------- Meta Pixel PageView on Route Change ---------------- */
function MetaPixelPageView() {
  const location = useLocation();

  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "PageView");
    }
  }, [location]);

  return null;
}

export default function Root() {
  const theme: any = {
    colorScheme: "dark",
    fontFamily: "Poppins, Inter, system-ui, -apple-system, sans-serif",
    headings: { fontFamily: "Poppins, sans-serif" },
    primaryColor: "blue",
  };

  return (
    <html lang='en'>
      <head>
        <Meta />
        <Links />

        {/* ================= Meta Pixel Code ================= */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '653568547217494');
              fbq('track', 'PageView');
            `,
          }}
        />

        <noscript>
          <img
            height='1'
            width='1'
            style={{ display: "none" }}
            src='https://www.facebook.com/tr?id=653568547217494&ev=PageView&noscript=1'
          />
        </noscript>
        {/* =============== End Meta Pixel Code =============== */}
      </head>

      <body className='bg-black text-white'>
        <MantineProvider theme={theme}>
          <ModalsProvider>
            <Notifications />
            <Outlet />
          </ModalsProvider>
        </MantineProvider>

        {/* 🔥 Tracks PageView on SPA navigation */}
        <MetaPixelPageView />

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
