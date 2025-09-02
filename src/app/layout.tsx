import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "WillowTax — Join the Waitlist",
  description: "Automate tax slips. Save hours. Reduce errors.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-willow-bg text-willow-text antialiased">{children}</body>
    </html>
  );
}