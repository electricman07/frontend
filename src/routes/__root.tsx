import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from "@tanstack/react-router";
import { fetchGlobalSettings } from "../utils/global";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";
import Footer from "../components/Footer";
import Header from "../components/Header";

import appCss from "../styles.css?url";

const THEME_INIT_SCRIPT = `(function(){try{var stored=window.localStorage.getItem('theme');var mode=(stored==='light'||stored==='dark'||stored==='auto')?stored:'auto';var prefersDark=window.matchMedia('(prefers-color-scheme: dark)').matches;var resolved=mode==='auto'?(prefersDark?'dark':'light'):mode;var root=document.documentElement;root.classList.remove('light','dark');root.classList.add(resolved);if(mode==='auto'){root.removeAttribute('data-theme')}else{root.setAttribute('data-theme',mode)}root.style.colorScheme=resolved;}catch(e){}})();`;

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "Porfolio | Adrian Popowich",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  loader: () => fetchGlobalSettings(),
  errorComponent: ({ error }) => (
    <div className="pt-32 text-center text-white">
      <h1 className="text-2xl font-bold">App Error</h1>
      <p className="text-red-400">{error.message}</p>
      <button
        onClick={() => window.location.reload()}
        className="mt-4 underline"
      >
        Retry
      </button>
    </div>
  ),
  component: RootDocument,
});

function RootDocument() {
  const globalData = Route.useLoaderData();
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <HeadContent />
      </head>

      <body
        className="bg-portfolio bg-fixed bg-cover bg-center font-sans antialiased text-white selection:bg-blue-500/30"
        suppressHydrationWarning
      >
        <div className="flex flex-col min-h-screen">
          <Header
            siteTitle={globalData.siteTitle}
            logo={globalData.logo}
            navLinks={globalData.navLinks}
          />
          <div className="grow pt-5">
            <Outlet />
          </div>
          <Footer />
        </div>

        <TanStackDevtools
          config={{ position: "bottom-right" }}
          plugins={[
            {
              name: "Tanstack Router",
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  );
}
