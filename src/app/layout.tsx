"use client";

import { Provider } from "react-redux";
import "../index.css";
import { store } from "./store";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <meta name="robots" content="max-image-preview:large" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="تقاضي" />
        <meta
          property="og:description"
          content="تــقـــاضـــــــي للمحاماة والاستشارات …"
        />
        <meta property="og:url" content="https://app.taqadi.com/" />
        <link
          rel="icon"
          type="image/svg+xml"
          href="/assets/images/cropped-logo-32x32.png"
          sizes="32x32"
        />
        <link
          rel="icon"
          type="image/svg+xml"
          href="/assets/images/cropped-logo-192x192.png"
          sizes="192x192"
        />
        <link
          rel="apple-touch-icon"
          href="/assets/images/cropped-logo-180x180.png"
        />

        <title>تقاضي &#8211; للإستشارات القانونية</title>
      </head>
      <body>
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}
