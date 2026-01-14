import "./globals.css";

export const metadata = {
  title: "NOTHING (BUILD)",
  description: "Advanced Mini-App Fabrication Module.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
