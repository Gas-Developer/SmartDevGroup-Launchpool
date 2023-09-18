import '../assets/styles/globals.css'
import "bootstrap/dist/css/bootstrap.min.css";
import { Providers } from './providers';
import { GlobalContextProvider } from "./Context/store";

export const metadata = {
  title: 'Launchpool',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
  }) {
  return (
      <html lang="en">
          <body>
              <Providers>
                  <GlobalContextProvider>{children}</GlobalContextProvider>
              </Providers>
          </body>
      </html>
  );
}
