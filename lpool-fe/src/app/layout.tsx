import '../assets/styles/globals.css'
import "bootstrap/dist/css/bootstrap.min.css";

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
      <body>{children}</body>
    </html>
  );
}
