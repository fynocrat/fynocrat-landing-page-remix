// root.tsx
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import type { LinksFunction, MetaFunction } from "react-router";

import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";

import "@fontsource/poppins/400.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";

// root.tsx top-level (only once)
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "./tailwind-output.css"; // if using compiled tailwind
import "./app.css"; // the CSS snippet you pasted earlier
// Removed root action - forms should submit to route-level actions
// The home route has its own action that handles API calls

export const links: LinksFunction = () => [];
export const meta: MetaFunction = () => [
  { title: "Fynocrat Landing" },
  { name: "viewport", content: "width=device-width,initial-scale=1" },
];

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
      </head>
      <body className='bg-black text-white'>
        <MantineProvider theme={theme}>
          <ModalsProvider>
            <Notifications />
            <Outlet />
          </ModalsProvider>
        </MantineProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
