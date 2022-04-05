import {
  json,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "remix";
import type { LinksFunction, MetaFunction, LoaderFunction } from "remix";
import clsx from 'clsx';

import {
  NonFlashOfWrongThemeEls,
  Theme,
  ThemeProvider,
  useTheme,
} from '~/utils/theme-provider';
import { getThemeSession } from './utils/theme.server';

import tailwindStylesheetUrl from "./styles/tailwind.css";
import { getUser } from "./session.server";

import { Navbar } from './components/navbar'
import { Footer } from './components/footer'
import { BottomBar } from './components/bottom-bar'

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: tailwindStylesheetUrl },
    { rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" },
  ];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Aniwait - Blog Anime",
  viewport: "width=device-width,initial-scale=1",
});

type LoaderData = {
  theme: Theme | null;
  user: Awaited<ReturnType<typeof getUser>>;
};

export const loader: LoaderFunction = async ({ request }) => {
  const themeSession = await getThemeSession(request);

  return json<LoaderData>({
    user: await getUser(request),
    theme: themeSession.getTheme(),
  });
};

function App() {
  const data = useLoaderData<LoaderData>();
  const [theme] = useTheme();
  
  return (
    <html lang="fr" className={clsx(theme)}>
      <head>
        <Meta />
        <Links />
        <NonFlashOfWrongThemeEls ssrTheme={Boolean(data.theme)} />
      </head>
      <body>
        <Navbar />
        <Outlet />
        <Footer />
        <BottomBar />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}


export default function AppWithProviders() {
  const data = useLoaderData<LoaderData>();

  return (
    <ThemeProvider specifiedTheme={data.theme}>
      <App />
    </ThemeProvider>
  );
}
