import "./globals.css";

export const metadata = {
  title: "Nexus Nebula Universe",
  description: "Nexus Nebula Universe (Next.js + FastAPI)"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
