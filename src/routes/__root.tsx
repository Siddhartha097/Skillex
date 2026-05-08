import {
    HeadContent,
    Scripts,
    createRootRouteWithContext,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";

import { ClerkProvider } from "@clerk/tanstack-react-start";

import TanStackQueryDevtools from "../integrations/tanstack-query/devtools";

import appCss from "../styles.css?url";

import type { QueryClient } from "@tanstack/react-query";
import Navbar from "#/components/Navbar";
import Crosshair from "#/components/Crosshair";

interface MyRouterContext {
    queryClient: QueryClient;
}

const THEME_INIT_SCRIPT = `
  (function() {
    const theme = localStorage.getItem('theme') || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    if (theme) document.documentElement.classList.add(theme);
  })();
`;

export const Route = createRootRouteWithContext<MyRouterContext>()({
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
                title: "Skillex | The Ultimate Skill-Sharing Platform",
            },
            {
                name: "description",
                content:
                    "Skillex is a platform that connects skilled individuals with those seeking to learn. Share your expertise, discover new skills, and grow together in our vibrant community.",
            },
        ],
        links: [
            {
                rel: "stylesheet",
                href: appCss,
            },
        ],
    }),
    shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <script
                    dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }}
                />
                <HeadContent />
            </head>
            <body className="font-sans antialiased wrap-anywhere">
                <ClerkProvider>
                    <div id="root-layout">
                        <header>
                            <div className="frame">
                                <Navbar />
                                <Crosshair />
                                <Crosshair />
                            </div>
                        </header>

                        <main>
                            <div className="frame">{children}</div>
                        </main>
                    </div>

                    <TanStackDevtools
                        config={{
                            position: "bottom-right",
                        }}
                        plugins={[
                            {
                                name: "Tanstack Router",
                                render: <TanStackRouterDevtoolsPanel />,
                            },
                            TanStackQueryDevtools,
                        ]}
                    />
                </ClerkProvider>
                <Scripts />
            </body>
        </html>
    );
}
