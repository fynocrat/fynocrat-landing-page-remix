import { type RouteConfig, index } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  // Catch-all for Chrome DevTools and other well-known paths
  {
    path: "/.well-known/*",
    loader: () => {
      return new Response(null, { status: 404 });
    },
  },
] satisfies RouteConfig;
